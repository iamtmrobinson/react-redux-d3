import * as d3 from "d3";

let simulation;
let nodeSelection;
let linkSelection;

const initialise = (svg, { nodes, links }, { width, height }) => {
  const container = d3
    .select(svg)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  container.append("g").attr("class", "nodes");
  container.append("g").attr("class", "links");

  simulation = d3
    .forceSimulation(nodes, links)
    .alphaDecay(0.2)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("collide", d3.forceCollide().strength(1))
    .on("tick", ticked);
};

const draw = ({ nodes, links }) => {
  nodeSelection = d3
    .select(".nodes")
    .selectAll(".node")
    .data(nodes);

  nodeSelection.exit().remove();

  nodeSelection = nodeSelection
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("data-id", d => d.id)
    .style("fill", "red")
    .attr("r", 5)
    .merge(nodeSelection);

  linkSelection = d3
    .select(".links")
    .selectAll(".link")
    .data(links);

  linkSelection.exit().remove();

  linkSelection = linkSelection
    .enter()
    .append("line")
    .attr("class", "link")
    .merge(linkSelection);

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
};

const ticked = () => {
  nodeSelection.attr("cx", d => d.x).attr("cy", d => d.y);

  linkSelection
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
};

export { initialise, draw };
