import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ index, url, img, track, artist }) => (
  <li className="list-group-item">
    <span>{index}</span>
    <a href={url}>
      <img src={img} alt="thumbnail" />
    </a>
    <span>{track}  -</span> <strong>{artist}</strong>
  </li>
);

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default ListItem;
