import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
      <li className="list-group-item">
        <span>{this.props.index}</span>
        <a href={this.props.url}>
          <img src={this.props.img} alt="thumbnail" />
        </a>
        <span>{this.props.track}  -</span> <strong>{this.props.artist}</strong>
      </li>
    );
  }
}

export default ListItem;
