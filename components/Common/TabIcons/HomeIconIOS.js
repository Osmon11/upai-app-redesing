import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HomeIconIOS({ width, height, color }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.49 0L0 9.11l1.074 1.236.982-.853v8.05A2.46 2.46 0 004.513 20h4.585v-8.025h2.866V20h4.504a2.46 2.46 0 002.456-2.457v-8.05l.982.853L20.98 9.11 10.49 0zm6.797 17.543a.82.82 0 01-.82.82h-2.865v-8.025H7.46v8.024H4.512a.82.82 0 01-.818-.818V8.07L10.49 2.17l6.797 5.902v9.472z"
        fill={color}
      />
    </Svg>
  );
}

export default HomeIconIOS;
