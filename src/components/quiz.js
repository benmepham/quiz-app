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
            answer: null,
        };
        this.setOptions = this.setOptions.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.restartSame = this.restartSame.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url)
            .then((response) => response.json())
            .then((data) =>
                this.setOptions(data.results, this.state.questionIndex)
            );
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
        this.setState({ answer: event.target.value });
    }

    handleNext() {
        const {
            answer,
            correct,
            correctAnswers,
            quizData,
            questionIndex,
        } = this.state;
        if (answer === correct) {
            console.log("correct");
            this.setState({ correctAnswers: correctAnswers + 1 });
        }
        if (questionIndex == quizData.length - 1) {
            this.setState({
                isComplete: true,
            });
            return;
        }
        this.setOptions(quizData, questionIndex + 1);
        this.setState({ questionIndex: this.state.questionIndex + 1 });
    }

    restartSame() {
        this.setState({
            questionIndex: 0,
            correctAnswers: 0,
            isComplete: false,
            correct: null,
            answer: null,
        });
    }

    render() {
        const {
            quizData,
            isLoading,
            questionIndex,
            answer,
            correct,
            correctAnswers,
            isComplete,
        } = this.state;
        return (
            <div>
                {this.state.isLoading && <Loader />}

                {!isLoading && !isComplete && (
                    <div>
                        <h1>{`Question No.${questionIndex + 1} of ${
                            quizData.length
                        }`}</h1>
                        <p>{`Q. ${he.decode(
                            quizData[questionIndex].question
                        )}`}</p>
                        <p>Please choose one of the following answers</p>
                        {this.state.options.map((item) => (
                            <button
                                style={
                                    answer === item
                                        ? { color: "red" }
                                        : { color: "black" }
                                }
                                value={item}
                                onClick={this.handleClick}
                            >
                                {item}
                            </button>
                        ))}

                        <button onClick={this.handleNext}>Next</button>
                    </div>
                )}

                {!isLoading && isComplete && (
                    <div>
                        complete!<div>{correctAnswers}</div>
                        <button onClick={this.restartSame}>Try again?</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Quiz;
