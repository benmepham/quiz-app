import logo from './logo.svg';
import './App.css';
import Quiz from "./components/quiz.js";
import Loader from "./components/loader.js"
import React, { Component } from "react";


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// Main App class
class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          isLoading: false,
          isRunning: false,
          url: null,
      };
      this.startQuiz = this.startQuiz.bind(this);
  }
  
  // Starts the quiz after choices selecteded
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
      console.log(values, url);
  }

  render() {
      const { isLoading, isRunning, url } = this.state;
      return (
          <div>
              {!isLoading && !isRunning && (
                  <Start startQuiz={this.startQuiz} />
              )}

              {!isLoading && isRunning && <Quiz url={url} />}
          </div>
      );
  }
}

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

  // setData(result) {
  //     this.setState
  // }

  // sets state to selection
  handleChange(event) {
      const type = event.target.id;
      const value = event.target.value;
      console.log(type, value);
      this.setState({ [type]: value });
  }
  handleSubmit(event) {
      alert(this.state.category);
  }

  render() {
      const { category, difficulty, type } = this.state;
      const vals = { category, difficulty, type };
      return (
          <div>
              {this.state.isLoading && <Loader />}
              {!this.state.isLoading && (
                  <form onSubmit={this.handleSubmit}>
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








export default App;
