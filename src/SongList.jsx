import React, { Component } from 'react';
import ListItem from './ListItem.jsx'

class SongList extends Component {

  render() {
    // console.log(`*******`);
    // console.log(` INDEX: ${this.props.index + 1}`)
    // console.log(`*******`);


    if (this.props.nodes.length > 0) {
      // console.log('mapping...')
      let listNode = [];
  
      for (let i = 0; i < this.props.numItems; i++) {
        // console.log(`artist: ${nodes[i].artist}  track: ${nodes[i].track}`);
        console.log(`i: ${i}`)
        listNode.push(
          <ListItem
            className="list-group"
            artist={this.props.nodes[i].artist}
            track={this.props.nodes[i].track}
            index={i+1}
            key={i}
            url={this.props.nodes[i].url}
            img={this.props.nodes[i].img}
          />
        );
      }
      
      return ( <ul className="list-group" style={{marginTop:'30px'}}>{listNode}</ul> );  
    } 
    else {
      return (<ul className="list-group" style={{marginTop:'30px'}}></ul>)
    }
  }
};

export default SongList;
