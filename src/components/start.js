import React, { Component } from "react";

// Start page with selector
class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulties: ["Easy", "Medium", "Hard"],
            types: [
                { value: "multiple", text: "Multiple Choice" },
                { value: "boolean", text: "True/False" },
            ],
            category: "",
            difficulty: "",
            type: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // sets state to selection
    handleChange(event) {
        const type = event.target.id;
        const value = event.target.value;
        // console.log(type, value);
        this.setState({ [type]: value });
    }

    render() {
        const { category, difficulty, type, difficulties, types } = this.state,
            vals = { category, difficulty, type },
            { categories } = this.props;
        return (
            <div className="start">
                <select
                    id="category"
                    className="button_start"
                    onChange={this.handleChange}
                >
                    <option value="" selected>
                        Any Category
                    </option>

                    {categories.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>

                <select
                    id="difficulty"
                    className="button_start"
                    onChange={this.handleChange}
                >
                    <option value="" selected>
                        Any Difficulty
                    </option>
                    {difficulties.map((item) => (
                        <option value={item.toLowerCase()}>{item}</option>
                    ))}
                </select>

                <select
                    id="type"
                    className="button_start"
                    onChange={this.handleChange}
                >
                    <option value="" selected>
                        Any Type
                    </option>
                    {types.map((item) => (
                        <option value={item.value}>{item.text}</option>
                    ))}
                </select>

                <button
                    className="button_start left"
                    onClick={() => this.props.startQuiz(vals)}
                >
                    Start
                </button>
            </div>
        );
    }
}

export default Start;
