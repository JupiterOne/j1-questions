import React, { createElement } from 'react';

import DefaultIcon from 'react-feather/dist/icons/truck';

const SVG_SIZE = 128;
const VIEW_BOX = 48;
const ICON_SIZE = 24;
const RADIUS = 18;
const PAD = ((VIEW_BOX - ICON_SIZE) / 2) * 1.25;
const CENTER = VIEW_BOX / 2;

const NODE_COLOR = '#FFFFFF';

type NodeIconProps = {
  icon?: any;
};

export const GraphNodeIcon = ({
  icon = DefaultIcon
}: NodeIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SVG_SIZE}
      height={SVG_SIZE}
      viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`}
    >
      <defs>
        <filter id="f1" x="-40%" y="-40%" height="200%" width="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.75" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <filter id="f2" x="-40%" y="-40%" height="200%" width="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill={NODE_COLOR}
        />
        <g transform={`translate(${PAD}, ${PAD}), scale(0.75)`}>
          {createElement(icon, {
            color: 'gray',
            strokeWidth: 1.25,
          })}
        </g>
      </g>
    </svg>
  )
};

export default GraphNodeIcon;
