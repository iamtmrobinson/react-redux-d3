import React from "react";

class NodeCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleAdd = event => {
    event.preventDefault();
    this.props.onAdd(this.state.value);
  };

  handleRemove = event => {
    event.preventDefault();
    this.props.onRemove(this.state.value);
  };

  render() {
    return (
      <form>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <button onClick={this.handleAdd}>Add</button>
        <button onClick={this.handleRemove}>Remove</button>
      </form>
    );
  }
}

export default NodeCreator;
