import * as types from "./actionTypes";

const initialState = {
  nodes: [{ id: "a" }],
  links: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export function getGraph(state) {
  return {
    nodes: state.graph.nodes,
    links: state.graph.links
  };
}
