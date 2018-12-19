import React from "react";

import { initialise, draw } from "./display";

const WIDTH = 500;
const HEIGHT = 500;

class Graph extends React.Component {
  componentDidMount() {
    initialise(this.svg, this.props.graph, { width: WIDTH, height: HEIGHT });
    draw(this.props.graph);
  }

  componentDidUpdate() {
    draw(this.props.graph);
  }

  render() {
    return (
      <div className="c-node-graph">
        <svg ref={svg => (this.svg = svg)} className=".c-node-graph" />
      </div>
    );
  }
}

export default Graph;
