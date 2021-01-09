import React, { Component } from "react";
import Loader from "./loader.js";

// Start page with selector
class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            categories: [],
            difficulties: ["Easy", "Medium", "Hard"],
            types: [
                { value: "multiple", text: "Multiple Choice" },
                { value: "boolean", text: "True/False" },
            ],
            formVal: null,
            category: "",
            difficulty: "",
            type: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // Fetches list of categories
    componentDidMount() {
        fetch("https://opentdb.com/api_category.php")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    categories: data.trivia_categories,
                    isLoading: false,
                })
            );
    }

    // sets state to selection
    handleChange(event) {
        const type = event.target.id;
        const value = event.target.value;
        // console.log(type, value);
        this.setState({ [type]: value });
    }
    // handleSubmit() {
    //     alert(this.state.category);
    // }

    render() {
        const { category, difficulty, type } = this.state;
        const vals = { category, difficulty, type };
        return (
            <div>
                {this.state.isLoading && <Loader />}
                {!this.state.isLoading && (
                    <form>
                        {/* onSubmit={this.handleSubmit} */}
                        <select id="category" onChange={this.handleChange}>
                            <option value="" selected="selected">
                                Any Category
                            </option>

                            {this.state.categories.map((item) => (
                                <option value={item.id}>{item.name}</option>
                            ))}
                        </select>

                        <select id="difficulty" onChange={this.handleChange}>
                            <option value="" selected="selected">
                                Any Difficulty
                            </option>
                            {this.state.difficulties.map((item) => (
                                <option value={item.toLowerCase()}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select id="type" onChange={this.handleChange}>
                            <option value="" selected="selected">
                                Any Type
                            </option>
                            {this.state.types.map((item) => (
                                <option value={item.value}>{item.text}</option>
                            ))}
                        </select>
                        <input
                            type="submit"
                            value="Submit"
                            onClick={() => this.props.startQuiz(vals)}
                        />
                    </form>
                )}
            </div>
        );
    }
}

export default Start;
