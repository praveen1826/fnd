import "./App.css";
import React from "react";
//import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "./model.json";
import { tensor } from "@tensorflow/tfjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", outp: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadModel = this.loadModel.bind(this);
  }
  loadModel = async () => {
    const model = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/praveen1826/fnd/main/src/model.json"
    );
    //const outp1 = await model.classify(this.state.value);
    const a = tf.tensor([
      [
        4058, 55, 65, 1529, 109, 39, 1, 241, 2, 759, 453, 556, 1186, 677, 111,
        242, 67, 436, 13, 2402, 111, 2, 1353, 3668, 3994, 5, 462, 10, 93, 5,
        154, 497, 93, 10, 967, 71, 33, 74, 9921, 436, 5, 8, 7, 58, 32, 239, 434,
        151, 16, 26, 8372, 71, 33, 296, 44, 165, 140, 2, 26, 510, 2180, 10, 1,
        883, 2755, 3, 1337, 436, 2254, 1, 8109, 2070, 32, 170, 33, 241, 2, 133,
        2, 1, 1529, 3, 1, 378, 151, 71, 348, 32, 239, 3094, 4, 144, 8, 40, 562,
        2, 1, 4004, 3, 1088, 6, 1, 56, 3, 3121, 5, 32, 715, 41, 478, 163, 14, 1,
        97, 463, 8, 3968, 7, 144, 8, 3121, 759, 1, 135, 2, 436, 3, 57, 7462,
        1297, 5, 8109, 5, 2, 1712, 596, 497, 3, 124, 117, 1, 436, 3, 102, 453,
        1297, 48, 8109, 11, 1500, 1747, 2, 1993, 541, 1, 127, 1088, 225, 344,
        38, 170, 1, 7546, 17, 152, 2643, 5, 604, 3968, 55, 10, 1706, 131, 3286,
        16, 1, 635, 3, 197, 14, 17, 4718, 1840, 1125, 3968, 260, 1, 225, 3, 197,
        484, 3121, 18, 83, 770, 3, 131, 7696, 1, 707, 15, 19, 326, 2, 520, 1088,
        11, 2838, 5, 1095, 66, 378, 58, 13, 254, 16, 8, 8372, 3555, 1, 3154, 25,
        26, 7546, 40, 136, 526, 3968, 2771, 8, 197, 3298, 696, 2, 635, 2673, 3,
        58, 13, 2912, 2, 91, 2, 8372, 6, 1, 2764, 3, 19, 224, 324, 4522, 203,
        164, 1304, 1430,
      ],
    ]);
    const outp1 = model.predict(a);

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
