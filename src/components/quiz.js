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
                <div>
                    complete!
                    <div>{correctAnswers}</div>
                    <button onClick={this.restartSame}>Retry?</button>
                    <button onClick={this.props.restartQuiz}>
                        Back to Home
                    </button>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <h1>{`Question No. ${questionIndex + 1} of ${
                        quizData.length
                    }`}</h1>
                    <p>{`Q. ${he.decode(quizData[questionIndex].question)}`}</p>
                    <p>Please choose one of the following answers</p>
                    {!showAnswer && (
                        <div>
                            {this.state.options.map((item) => (
                                <button
                                    style={
                                        selected === item
                                            ? { color: "blue" }
                                            : { color: "black" }
                                    }
                                    value={item}
                                    onClick={this.handleClick}
                                >
                                    {he.decode(item)}
                                </button>
                            ))}
                            <button onClick={this.handleCheck}>Check</button>
                        </div>
                    )}
                    {showAnswer && (
                        <div>
                            {this.state.options.map((item) => (
                                <button
                                    style={
                                        item === correct
                                            ? { color: "green" }
                                            : item === selected &&
                                              item !== correct
                                            ? { color: "blue" }
                                            : { color: "black" }
                                    }
                                    value={item}
                                >
                                    {he.decode(item)}
                                </button>
                            ))}
                            <button onClick={this.handleNext}>Next</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
