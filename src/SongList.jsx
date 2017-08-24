import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

class SongList extends Component {
  render() {
    if (this.props.nodes.length > 0) {
      const listNode = [];

      for (let i = 0; i < this.props.numItems; i++) {
        listNode.push(
          <ListItem
            className="list-group"
            artist={this.props.nodes[i].artist}
            track={this.props.nodes[i].track}
            index={i + 1}
            key={i}
            url={this.props.nodes[i].url}
            img={this.props.nodes[i].img}
          />,
        );
      }
      return (<ul className="list-group" style={{ marginTop: '30px' }}>{listNode}</ul>);
    }

    return (<ul className="list-group" style={{ marginTop: '30px' }} />);
  }
}

export default SongList;
