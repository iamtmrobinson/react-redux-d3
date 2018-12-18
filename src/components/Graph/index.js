import React from "react";
import * as d3 from "d3";

const WIDTH = 500;
const HEIGHT = 500;

class Graph extends React.Component {
  componentDidMount() {
    this.initialise(this.props);
    this.draw(this.props);
  }

  componentDidUpdate() {
    this.draw(this.props);
  }

  initialise = props => {
    const container = d3
      .select(this.svg)
      .attr("width", WIDTH)
      .attr("height", HEIGHT)
      .append("g")
      .attr("class", "container")
      .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");

    container.append("g").attr("class", "nodes");
    container.append("g").attr("class", "links");

    this.simulation = d3
      .forceSimulation(props.graph.nodes, props.graph.links)
      .alphaDecay(0.2)
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink(props.graph.links).id(d => d.id))
      .force("collide", d3.forceCollide().strength(1))
      .on("tick", this.ticked);
  };

  draw = props => {
    this.nodesSelection = d3
      .select(".nodes")
      .selectAll(".node")
      .data(props.graph.nodes);

    this.nodesSelection.exit().remove();

    this.nodesSelection = this.nodesSelection
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("data-id", d => d.id)
      .style("fill", "red")
      .attr("r", 5)
      .merge(this.nodesSelection);

    this.linkSelection = d3
      .select(".links")
      .selectAll(".link")
      .data(props.graph.links);

    this.linkSelection.exit().remove();

    this.linkSelection = this.linkSelection
      .enter()
      .append("line")
      .attr("class", "link")
      .merge(this.linkSelection);

    this.simulation.nodes(props.graph.nodes);
    this.simulation.force("link").links(props.graph.links);
    this.simulation.alpha(1).restart();
  };

  ticked = () => {
    this.nodesSelection.attr("cx", d => d.x).attr("cy", d => d.y);

    this.linkSelection
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  };

  render() {
    return (
      <div className="c-node-graph">
        <p>Graph</p>
        <svg ref={svg => (this.svg = svg)} className=".c-node-graph" />
      </div>
    );
  }
}

export default Graph;
