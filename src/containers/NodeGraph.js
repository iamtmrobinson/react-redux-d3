import { connect } from "react-redux";

import NodeGraph from "../components/NodeGraph";
import { addNode, removeNode } from "../store/graph/actions";
import * as graphSelectors from "../store/graph/reducer";

const mapStateToProps = state => {
  return {
    graph: graphSelectors.getGraph(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNode: name => dispatch(addNode(name)),
    removeNode: name => dispatch(removeNode(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeGraph);
