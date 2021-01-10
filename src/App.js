//import logo from './logo.svg';
import "./App.css";
import Quiz from "./components/quiz.js";
import Start from "./components/start.js";
//import Loader from "./components/loader.js"
import React, { Component } from "react";

// Main App class
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            url: null,
        };
        this.startQuiz = this.startQuiz.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }
 
    getCategories() {

    }

    // Starts the quiz after choices selected
    startQuiz(values) {
        const { category, difficulty, type } = values;
        const url =
            "https://opentdb.com/api.php?amount=10&category=" +
            category +
            "&difficulty=" +
            difficulty +
            "&type=" +
            type;
        this.setState({ isRunning: true, url });
    }

    handleRestart() {
        this.setState({ isRunning: false });
    }

    render() {
        const { isRunning, url } = this.state;
        return (
            <div>
                {!isRunning && <Start startQuiz={this.startQuiz} />}
                {isRunning && (
                    <Quiz url={url} restartQuiz={this.handleRestart} />
                )}
            </div>
        );
    }
}

export default App;
