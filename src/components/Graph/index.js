import React from "react";
import * as d3 from "d3";

const WIDTH = 500;
const HEIGHT = 500;

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

class Graph extends React.Component {
  componentDidMount() {
    console.log("Did Mount");

    this.initialise(this.props);
    this.draw(this.props);
  }

  shouldComponentUpdate(nextProps) {
    console.log("Should Update");

    this.draw(nextProps);
    return true;
  }

  componentDidUpdate() {}

  initialise = props => {
    console.log("Initialise");

    const svg = d3
      .select(this.svg)
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    svg
      .append("g")
      .attr("class", "container")
      .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");

    this.simulation = d3
      .forceSimulation(props.graph.nodes, props.graph.links)
      .alphaDecay(0.5)
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink(props.graph.links).id(d => d.id))
      .force("collide", d3.forceCollide().strength(1))
      .on("tick", this.ticked);
  };

  draw = props => {
    console.log("Draw", props.graph.links);

    const svg = d3.select(".container");

    this.nodesSelection = svg.selectAll(".node").data(props.graph.nodes);

    const nodeTransition = d3.transition().duration(250);

    this.nodesSelection.exit().remove();

    var nodeContainers = this.nodesSelection
      .enter()
      .append("g")
      .attr("class", "node")
      .merge(this.nodesSelection);

    nodeContainers
      .append("circle")
      .style("fill", "#45b29d")
      .attr("r", 5);

    nodeContainers.append("text").text(d => d.id);

    this.linksSelection = svg.selectAll(".link").data(props.graph.links);

    this.linksSelection
      .exit()
      .style("fill", "#b26745")
      .transition(nodeTransition)
      .attr("stroke-width", 1e-6)
      .remove();

    this.linksSelection
      .enter()
      .append("line")
      .attr("class", "link");

    this.simulation.nodes(props.graph.nodes);
    this.simulation.force("link").links(props.graph.links);
    this.simulation.alpha(1).restart();

    console.log("----");
  };

  ticked = () => {
    console.log("tick");

    this.nodesSelection.attr("transform", d => `translate(${d.x}, ${d.y})`);

    this.linksSelection
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  };

  render() {
    console.log("Render");

    return (
      <div className="c-node-graph">
        <p>Graph</p>
        <svg ref={svg => (this.svg = svg)} className=".c-node-graph" />
      </div>
    );
  }
}

export default Graph;
