import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ProfileIconIOS({ width, height, color }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M.75 14.438c0-.125.055-.367.235-.567.16-.177.48-.394 1.154-.394h11.123c.04 0 .17.024.283.134.094.09.25.31.25.827 0 .751-.19 1.94-1.047 2.933-.837.97-2.422 1.879-5.475 1.879C2.52 19.25.75 16.13.75 14.438zm11.227-8.983a4.705 4.705 0 11-9.409 0 4.705 4.705 0 019.41 0z"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default ProfileIconIOS;
