import React from "react";

class Graph extends React.Component {
  render() {
    const { graph } = this.props;

    return (
      <div>
        <p>Graph</p>
        {graph.nodes && (
          <ul>
            {graph.nodes.map(node => (
              <li key="hi">Hi</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Graph;
