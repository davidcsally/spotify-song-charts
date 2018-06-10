import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';

const generateListItem = (node, i) => (
  <ListItem
    className="list-group"
    artist={node.artist}
    track={node.track}
    index={i + 1}
    key={i}
    url={node.url}
    img={node.img}
  />
);

/** Used in App */
const SongList = ({ nodes }) => {
  if (nodes.length > 0) {
    const listNode = nodes.map((node, i) => generateListItem(nodes[i], i));
    return <ul className="list-group" style={{ marginTop: '30px' }}>{listNode}</ul>;
  }
  return (<ul className="list-group" style={{ marginTop: '30px' }} />);
};

SongList.propTypes = {
  nodes: PropTypes.array.isRequired, // refactor this
};

export default SongList;
