import * as React from 'react';
import { color } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

function NotificationIconSVG({ width, height, color }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.072 15.042a4.965 4.965 0 01-.358-1.857V8.571c0-3.2-2.13-5.884-5.036-6.789A2.142 2.142 0 008.57 0a2.142 2.142 0 00-2.106 1.782c-2.906.905-5.036 3.59-5.036 6.79v4.613c0 .639-.12 1.264-.358 1.857l-1.02 2.55a.715.715 0 00.663.98h5.43C6.65 19.431 7.554 20 8.571 20c1.018 0 1.921-.568 2.428-1.429h5.43a.713.713 0 00.663-.979l-1.02-2.55zm-14.303 2.1l.628-1.57c.305-.762.46-1.565.46-2.387V8.571a5.72 5.72 0 015.714-5.714 5.72 5.72 0 015.715 5.714v4.614a6.4 6.4 0 00.46 2.387l.628 1.57H1.769z"
        fill={color}
      />
    </Svg>
  );
}

export default NotificationIconSVG;
