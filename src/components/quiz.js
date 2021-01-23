import React, { Component } from "react";
import Loader from "./loader.js";
import he from "he";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            quizData: null,
            questionIndex: 0,
            correctAnswers: 0,
            isComplete: false,
            correct: null,
            selected: null,
            showAnswer: false,
        };
        this.setOptions = this.setOptions.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.restartSame = this.restartSame.bind(this);
    }

    componentDidMount() {
        this.setOptions(this.props.questions, this.state.questionIndex);
    }

    setOptions(quizData, questionIndex) {
        const options = [...quizData[questionIndex].incorrect_answers];
        const correct = Math.floor(Math.random() * (options.length + 1) + 1);
        options.splice(correct, 1, quizData[questionIndex].correct_answer);
        this.setState({
            options,
            quizData,
            correct: quizData[questionIndex].correct_answer,
            isLoading: false,
        });
    }

    handleClick(event) {
        this.setState({ selected: event.target.value });
    }

    handleCheck() {
        const { selected, correct, correctAnswers } = this.state;
        this.setState({ showAnswer: true });
        if (selected === correct) {
            this.setState({ correctAnswers: correctAnswers + 1 });
        }
    }

    handleNext() {
        const { quizData, questionIndex } = this.state;

        if (questionIndex === quizData.length - 1) {
            this.setState({
                isComplete: true,
            });
            return;
        }
        this.setOptions(quizData, questionIndex + 1);
        this.setState({
            questionIndex: this.state.questionIndex + 1,
            showAnswer: false,
            selected: null,
        });
    }

    restartSame() {
        this.setState({
            questionIndex: 0,
            correctAnswers: 0,
            isComplete: false,
            correct: null,
            selected: null,
        });
    }

    render() {
        const {
            quizData,
            isLoading,
            questionIndex,
            selected,
            correct,
            correctAnswers,
            isComplete,
            showAnswer,
        } = this.state;

        if (isLoading) {
            return <Loader />;
        }

        if (isComplete) {
            return (
                <div className="complete">
                    <h1 className="complete-item">Complete</h1>
                    <h3 className="complete-item">
                        You scored {correctAnswers} out of 10
                    </h3>
                    <button
                        className="button-complete btn1"
                        onClick={this.restartSame}
                    >
                        Retry?
                    </button>
                    <button
                        className="button-complete btn2"
                        onClick={this.props.restartQuiz}
                    >
                        Home
                    </button>
                </div>
            );
        }

        return (
            <div className="quiz">
                {/* <div className="item">
                    <h2>{`Question No. ${questionIndex + 1} of ${
                        quizData.length
                    }`}</h2>
                </div> */}

                <h2 className="item">{`Question No. ${questionIndex + 1} of ${
                    quizData.length
                }`}</h2>

                <h3 className="item">{`Q. ${he.decode(
                    quizData[questionIndex].question
                )}`}</h3>
                <p className="item">
                    Please choose one of the following answers:
                </p>
                {!showAnswer && (
                    <div className="options">
                        {this.state.options.map((item) => (
                            <button
                                className={
                                    selected === item
                                        ? "button-quiz selected"
                                        : "button-quiz"
                                }
                                value={item}
                                onClick={this.handleClick}
                            >
                                {he.decode(item)}
                            </button>
                        ))}
                        <button
                            className="button-quiz left"
                            onClick={this.handleCheck}
                        >
                            Check
                        </button>
                    </div>
                )}
                {showAnswer && (
                    <div className="options">
                        {this.state.options.map((item) => (
                            <button
                                className={
                                    item === correct
                                        ? "button-quiz correct"
                                        : item === selected && item !== correct
                                        ? "button-quiz selected"
                                        : "button-quiz"
                                }
                                value={item}
                            >
                                {he.decode(item)}
                            </button>
                        ))}
                        <button
                            className="button-quiz left"
                            onClick={this.handleNext}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Quiz;
