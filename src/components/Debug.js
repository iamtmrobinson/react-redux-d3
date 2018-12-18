import React from "react";

const getId = node => {
  if (typeof node === "string") return node;

  return node.id;
};

class Debug extends React.Component {
  handleClick = ({ target }) => {
    this.props.onRemove(target.innerText);
  };

  render() {
    const { graph } = this.props;

    return (
      <div className="c-node-list">
        <h2>Node List</h2>
        {graph.nodes && (
          <ul>
            {graph.nodes.map((node, index) => (
              <li key={`node-${index}`} onClick={this.handleClick}>
                {node.id}
              </li>
            ))}
          </ul>
        )}
        <h2>Link List</h2>
        {graph.links && (
          <ul>
            {graph.links.map((link, index) => (
              <li key={`link-${index}`}>
                {getId(link.source)} to {getId(link.target)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Debug;
