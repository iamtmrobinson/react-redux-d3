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
    d3.select(".container > *").remove();
    const svg = d3.select(".container");

    var simulation = d3
      .forceSimulation(props.graph.nodes, props.graph.links)
      .force("link", d3.forceLink(props.graph.links).id(d => d.id))
      .force("collide", d3.forceCollide().strength(1))
      .on("tick", this.ticked);

    this.nodesSelection = svg.selectAll(".node").data(props.graph.nodes);

    this.nodesSelection
      .enter()
      .append("circle")
      .attr("class", "node")
      .style("fill", "#45b29d")
      .attr("r", 5);

    this.linksSelection = svg
      .append("g")
      .selectAll(".link")
      .data(props.graph.links)
      .enter()
      .append("line")
      .attr("class", "link");
  };

  ticked = () => {
    this.nodesSelection
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });

    this.linksSelection
      .attr("x1", d => {
        return d.source.x;
      })
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  };

  render() {
    return (
      <div>
        <p>Graph</p>
        <svg ref={svg => (this.svg = svg)} className=".c-node-graph" />
      </div>
    );
  }
}

export default Graph;
