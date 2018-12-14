import * as types from "./actionTypes";

const initialState = {
  nodes: [],
  links: []
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_NODE:
      return addNode(state, action);
    case types.REMOVE_NODE:
      return removeNode(state, action);
    default:
      return state;
  }
}

const addNode = (state, action) => {
  const newNode = { id: action.name };
  return Object.assign({}, state, { nodes: [...state.nodes, newNode] });
};

const removeNode = (state, action) => {
  const newNodes = state.nodes.filter(node => node.id !== action.name);
  return Object.assign({}, state, { nodes: [...newNodes] });
};

export function getGraph(state) {
  return {
    nodes: state.graph.nodes,
    links: state.graph.links
  };
}
