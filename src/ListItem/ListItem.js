import React from 'react';
import PropTypes from 'prop-types';
// import './ListItem.scss';

/** Used in SongList */
const ListItem = ({ index, url, img, track, artist }) => (
  <a className="list-group-item" href={url}>
    <li>
      <span>{index}</span>
      <img src={img} alt="thumbnail" />
      <span>{track}  -</span> <strong>{artist}</strong>
    </li>
  </a>
);

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default ListItem;
