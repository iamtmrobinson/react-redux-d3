import React from "react";

import Graph from "./Graph";
import NodeCreator from "./NodeCreator";

class NodeGraph extends React.Component {
  handleNodeAdd = name => {
    this.props.addNode(name);
  };

  render() {
    return (
      <div>
        <p>Node Graph</p>
        <NodeCreator onSubmit={this.handleNodeAdd} />
        <Graph graph={this.props.graph} />
      </div>
    );
  }
}

export default NodeGraph;
