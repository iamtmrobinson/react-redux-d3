import React from "react";

import Debug from "./Debug";
import Graph from "./Graph";
import NodeCreator from "./NodeCreator";

class NodeGraph extends React.Component {
  handleNodeAdd = name => {
    this.props.addNode(name);
  };

  handleNodeRemove = name => {
    this.props.removeNode(name);
  };

  render() {
    return (
      <div>
        <p>Node Graph</p>
        <NodeCreator
          onAdd={this.handleNodeAdd}
          onRemove={this.handleNodeRemove}
        />
        <Graph graph={this.props.graph} />
        <Debug graph={this.props.graph} onRemove={this.handleNodeRemove} />
      </div>
    );
  }
}

export default NodeGraph;
