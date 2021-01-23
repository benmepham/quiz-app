import "./App.css";
import Quiz from "./components/quiz.js";
import Start from "./components/start.js";
import React, { Component } from "react";
import Loader from "./components/loader";
import Error from "./components/error";
import Header from "./components/header";
import Footer from "./components/footer";

// Main App class
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isLoading: true,
            categories: null,
            error: null,
            questions: null,
        };
        this.startQuiz = this.startQuiz.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    componentDidMount() {
        fetch("https://opentdb.com/api_category.php")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    categories: data.trivia_categories,
                    isLoading: false,
                })
            )
            .catch((error) => this.setState({ error, isLoading: false }));
    }

    // Starts the quiz after choices selected
    startQuiz(values) {
        this.setState({ isLoading: true });
        const { category, difficulty, type } = values;
        const url =
            "https://opentdb.com/api.php?amount=10&category=" +
            category +
            "&difficulty=" +
            difficulty +
            "&type=" +
            type;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.response_code === 0) {
                    this.setState({
                        questions: data.results,
                        isLoading: false,
                        isRunning: true,
                    });
                } else {
                    throw new Error("API Error");
                }
            })
            .catch((error) => this.setState({ error, isLoading: false }));
    }

    handleRestart() {
        this.setState({ isRunning: false });
    }

    render() {
        const {
            isRunning,
            isLoading,
            categories,
            error,
            questions,
        } = this.state;

        if (error) {
            return <Error message={error.message} />;
        }

        if (isLoading) {
            return <Loader />;
        }

        return (
            <div className="wrapper">
                <Header />
                {!isRunning && (
                    <Start startQuiz={this.startQuiz} categories={categories} />
                )}
                {isRunning && (
                    <Quiz
                        restartQuiz={this.handleRestart}
                        questions={questions}
                    />
                )}
                <Footer />
            </div>
        );
    }
}

export default App;
