import React from "react";
import * as d3 from "d3";

const WIDTH = 300;
const HEIGHT = 300;

class Graph extends React.Component {
  componentDidMount() {
    this.initialise();
    this.draw(this.props);
  }

  componentDidUpdate() {
    this.draw(this.props);
  }

  initialise = () => {
    const svg = d3
      .select(this.svg)
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    svg
      .append("g")
      .attr("class", "container")
      .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");
  };

  draw = props => {
    const svg = d3.select(".container");

    var simulation = d3
      .forceSimulation(props.graph.nodes)
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter())
      // .alphaTarget(1)
      .on("tick", this.ticked);

    this.nodesSelection = svg.selectAll(".node").data(props.graph.nodes);

    this.nodesSelection
      .enter()
      .append("circle")
      .attr("class", "node")
      .style("fill", "#45b29d")
      .attr("r", 5);
  };

  ticked = () => {
    this.nodesSelection
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  };

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
