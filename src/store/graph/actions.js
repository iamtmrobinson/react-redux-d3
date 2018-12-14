import * as types from "./actionTypes";

export const addNode = name => {
  console.log("add node action");
  return {
    type: types.ADD_NODE,
    name
  };
};

export const removeNode = name => {
  return {
    type: types.REMOVE_NODE,
    name
  };
};
