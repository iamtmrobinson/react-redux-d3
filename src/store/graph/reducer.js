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

const pickRandomTarget = state => {
  const { nodes } = state;
  return nodes[Math.floor(Math.random() * nodes.length)];
};

const addNode = (state, action) => {
  let newLinks = state.links;

  const newNode = { id: action.name };

  if (state.nodes.length > 0) {
    const randomTarget = pickRandomTarget(state);
    newLinks = [
      ...state.links,
      { source: newNode.id, target: randomTarget.id }
    ];
  }

  const newNodes = [...state.nodes, newNode];

  return Object.assign({}, state, { nodes: newNodes, links: newLinks });
};

const removeNode = (state, action) => {
  const newNodes = state.nodes.filter(node => node.id !== action.name);
  const newLinks = state.links.filter(
    link => link.source.id !== action.name && link.target.id !== action.name
  );

  return Object.assign({}, state, { nodes: newNodes, links: newLinks });
};

export function getGraph(state) {
  return {
    nodes: state.graph.nodes,
    links: state.graph.links
  };
}
