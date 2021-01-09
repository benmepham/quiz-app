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
            answerSelected: null,
            isComplete: false,
        };
    }

    componentDidMount() {
        console.log(this.props.url);
        fetch(this.props.url)
            .then((response) => response.json())
            .then((data) =>
                this.setState({ quizData: data.results, isLoading: false })
            );
    }

    render() {
        console.log(this.state.quizData);
        const {
            quizData,
            isLoading,
            questionIndex,
            correctAnswers,
            answerSelected,
            isComplete,
        } = this.state;

        //const options =
        return (
            <div>
                {this.state.isLoading && <Loader />}
                {/* {!this.state.isLoading && (
                    <p>{JSON.stringify(this.state.quizData)}</p>
                )} */}

                {!isLoading && (
                    <div>
                        <h1>{`Question No.${questionIndex + 1} of ${
                            quizData.length
                        }`}</h1>
                        <p>{`Q. ${he.decode(
                            quizData[questionIndex].question
                        )}`}</p>
                        <p>Please choose one of the following answers</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Quiz;
