import React from 'react';
import PropTypes from 'prop-types';

export const COLORS = [
  'gray',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple'
] as const;

Tag.propTypes = {
  color: PropTypes.oneOf(COLORS)
};

type Color = typeof COLORS[number];

function Tag(props: { color: Color; children: React.ReactNode }) {
  const { color, children } = props;
  return <span className={`bg-${color}-400`}>{children || ''}</span>;
}

export default Tag;
