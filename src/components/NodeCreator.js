import React from "react";
import shortid from "shortid";

class NodeCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: shortid() };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleAdd = event => {
    event.preventDefault();
    this.props.onAdd(this.state.value);
    this.setState({ value: shortid() });
  };

  render() {
    return (
      <form className="c-node-creator">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleAdd}>Add</button>
      </form>
    );
  }
}

export default NodeCreator;
