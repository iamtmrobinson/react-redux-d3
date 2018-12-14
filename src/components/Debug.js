import React from "react";

class Debug extends React.Component {
  render() {
    const { graph } = this.props;

    return (
      <div>
        <h2>Nodes</h2>
        {graph.nodes && (
          <ul>
            {graph.nodes.map((node, index) => (
              <li key={`node-${index}`}>{node.id}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Debug;
