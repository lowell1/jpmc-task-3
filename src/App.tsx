import React, { Component } from "react";
import DataStreamer, { ServerRespond } from "./DataStreamer";
import Graph from "./Graph";
import "./App.css";

interface IState {
  data: ServerRespond[];
  showGraph: boolean;
  dataIsStreaming: boolean;
  dataStreamIntervalID?: number;
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false,
      dataIsStreaming: false,
      // dataStreamIntervalID: null
    };

    this.startDataStream = this.startDataStream.bind(this);
    this.stopDataStream = this.stopDataStream.bind(this);
  }

  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
  }

  startDataStream() {
    this.setState({
      dataStreamIntervalID: window.setInterval(() => {
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
          this.setState({
            data: serverResponds,
          });
        });
      }, 100),
      showGraph: true,
      dataIsStreaming: true,
    });
  }

  stopDataStream() {
    window.clearInterval(this.state.dataStreamIntervalID);
    this.setState({ dataIsStreaming: false });
  }

  // getDataFromServer() {
  //   let x = 0;
  //   const interval = setInterval(() => {
  //     DataStreamer.getData((serverResponds: ServerRespond[]) => {
  //       this.setState({
  //         data: serverResponds,
  //         showGraph: true,
  //       });
  //     });
  //     x++;
  //     if (x > 1000) {
  //       clearInterval(interval);
  //     }
  //   }, 100);
  // }

  render() {
    const dataStreamButton = this.state.dataIsStreaming ? (
      <button
        className="btn btn-secondary Stream-button"
        onClick={this.stopDataStream}
      >
        Stop streaming data
      </button>
    ) : (
      <button
        className="btn btn-primary Stream-button"
        onClick={this.startDataStream}
      >
        Start streaming data
      </button>
    );

    return (
      <div className="App">
        <header className="App-header">Bank Merge & Co Task 3</header>
        <div className="App-content">
          {dataStreamButton}
          {/* <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
            }}
          >
            Start Streaming Data
          </button> */}
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
