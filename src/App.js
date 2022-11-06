import "./App.css";
import React from "react";
//import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "./model.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", outp: 1 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadModel = this.loadModel.bind(this);
  }
  loadModel = async () => {
    const model = await tf.loadGraphModel("./model.json");
    //const outp1 = await model.classify(this.state.value);
    const outp1 = model.predict(this.state.value);

    this.setState({ outp: outp1 }, () => {
      console.log(this.state.outp);
    });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" onClick={this.loadModel} />
        <p>{this.state.outp}</p>
      </div>
    );
  }
}
export default App;
