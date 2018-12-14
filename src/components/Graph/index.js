import React from "react";
import * as d3 from "d3";

const WIDTH = 300;
const HEIGHT = 300;

const initialise = svgElement => {
  const svg = d3
    .select(svgElement)
    .attr("width", WIDTH)
    .attr("height", HEIGHT);
};

const draw = (svgElement, props) => {
  const svg = d3.select(svgElement);

  svg
    .append("text")
    .text("Edit the code below to change me!")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT / 2)
    .attr("font-size", 12)
    .attr("font-family", "monospace");
};

class Graph extends React.Component {
  componentDidMount() {
    initialise(this.svg);
    draw(this.svg, this.props);
  }

  componentDidUpdate() {
    draw(this.svg, this.props);
  }

  render() {
    const { graph } = this.props;

    return (
      <div>
        <p>Graph</p>
        <svg ref={svg => (this.svg = svg)} className=".c-node-graph" />
      </div>
    );
  }
}

export default Graph;
