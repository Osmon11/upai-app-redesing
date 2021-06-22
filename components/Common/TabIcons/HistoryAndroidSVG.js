import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HistoryAndroidSVG({ width, height, fill }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.6 0C4.298 0 0 4.135 0 9.236c0 5.101 4.298 9.237 9.6 9.237s9.6-4.136 9.6-9.237C19.2 4.136 14.902 0 9.6 0zm4.15 10.993H9.68c-.014 0-.026-.003-.04-.004-.014.001-.026.004-.04.004a.652.652 0 01-.664-.639v-6.52c0-.354.297-.64.664-.64.366 0 .664.286.664.64v5.881h3.486c.367 0 .664.287.664.64a.652.652 0 01-.664.638z"
        fill={fill}
      />
    </Svg>
  );
}

export default HistoryAndroidSVG;
