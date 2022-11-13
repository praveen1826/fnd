import "./App.css";
import React from "react";
//import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "./model.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [1][2], outp: [1], clk: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.loadModel = this.loadModel.bind(this);
    this.Load = this.Load.bind(this);
  }

  Load() {
    this.setState({
      clk: 1,
    });
  }
  loadModel = async () => {
    this.Load();
    const model = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/praveen1826/fnd/main/src/model.json"
    );
    //const outp1 = await model.classify(this.state.value);
    /*const inp = [
      [
        136, 150, 365, 301, 5, 8, 186, 3295, 59, 73, 12, 2636, 1, 9623, 36, 3,
        1, 89, 76, 3, 150, 848, 15, 12, 21, 3882, 2, 3842, 1, 3949, 169, 416, 5,
        1, 1189, 5, 320, 3, 1, 101, 1, 740, 4796, 848, 7, 1324, 2, 786, 4, 2659,
        2, 1, 153, 3032, 14, 7, 2003, 59, 1, 94, 40, 1423, 691, 301, 848, 1978,
        140, 2, 2618, 10, 4, 621, 9, 528, 439, 5, 1, 12, 92, 2156, 38, 479, 4,
        4017, 10, 1, 988, 8, 37, 822, 4, 1322, 2105, 1, 4267, 3437, 31, 311, 16,
        1948, 7, 1378, 1663, 8, 11, 1568, 2, 523, 9, 353, 439, 51, 3, 42, 399,
        2108, 40, 22, 2, 42, 218, 2695, 6, 178, 848, 677, 4, 8511, 2, 8, 20,
        193, 697, 78, 926, 74, 762, 39, 398, 289, 12, 21, 129, 291, 1566, 4,
        722, 4753, 3, 19, 92, 109, 848, 21, 2579, 6, 1228, 3, 291, 2951, 6, 31,
        2105, 9, 217, 439, 9, 318, 97, 848, 1331, 4, 174, 9, 291, 193, 13, 5190,
        16, 12, 8, 1566, 113, 22, 13, 63, 19, 4398, 447, 2, 12, 7, 326, 2, 3325,
        520, 618, 25, 1929, 1, 89, 76, 32, 645, 152, 5959, 3, 73, 12, 7, 326, 2,
        3325, 4568, 323, 25, 280, 143, 809, 972, 5, 1281, 2304, 4, 668, 2, 1,
        89, 76, 848, 87, 320, 318, 97, 6166, 1249, 1632, 848, 395, 8, 13, 2022,
        12, 7, 326, 10, 839, 4, 444, 549, 1, 35, 7, 329, 16, 506,
      ],
    ];*/
    //const a = tf.tensor(Array.from(parseInt(this.state.value)));

    const c = this.state.value;

    const b = c.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    const d = [b];
    const a = tf.tensor(d);
    //console.log(typeof inp);
    console.log(this.state.value);

    console.log(b);
    const outp1 = model.predict(a);
    outp1.print();
    console.log(outp1.dataSync()[0]);
    if (outp1.dataSync()[0] > 0.5) {
      this.setState({ outp: "News Is Fake" });
    }
    if (outp1.dataSync()[0] < 0.5) {
      this.setState({ outp: "News Is True" });
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      console.log(this.state.value);
    });
  }
  Loading() {
    if (this.state.clk === 1) {
      console.log("reached");
      if (typeof this.state.outp == "object") {
        return (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      }
    }

    if (typeof this.state.outp == "string") {
      return this.state.outp;
    }
  }

  render() {
    return (
      <>
        <div>
          <Navbar bg="light" expand="lg" className="mb-3">
            <Container className="ms-1">
              <Navbar.Brand href="#home">Fake News Detection</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="https://www.kaggle.com/code/praveen0123/notebooka1895547d8">
                    View Code
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <Row>
          <Col xs={5}>
            <Alert className="mb-3 ms-3" variant="primary" xs={4}>
              To Convert Your Text Into Model Readable Format Use This{" "}
              <Alert.Link href="https://www.kaggle.com/code/praveen0123/notebook1f673e7715">
                {" "}
                Notebook
              </Alert.Link>
            </Alert>
          </Col>
        </Row>

        <Form>
          <Form.Group className="mb-3 ms-3">
            <Row>
              <Col xs={4}>
                <Form.Label>Enter The Value To Be Predicted</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="Enter The Value To Be Predicted"
                />
              </Col>
            </Row>
          </Form.Group>

          <Button
            className="mb-3 ms-3"
            variant="primary"
            value="Submit"
            onClick={this.loadModel}
          >
            Predict
          </Button>
        </Form>
        <Row>
          <Col xs={5}>
            <Alert className="mb-3 ms-3" variant="success" xs={4}>
              {this.Loading()}
            </Alert>
          </Col>
        </Row>
      </>
    );
  }
}
export default App;
