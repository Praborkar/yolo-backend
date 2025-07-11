import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');
const ARC_HEIGHT = 40;

const ArcView = () => {
  return (
    <Svg
      width={width}
      height={ARC_HEIGHT + 10}
      style={{
      position: 'absolute',
      bottom: 100, // ⬅️ match this just above bottomNav (90 + 20)
      zIndex: 1,
    }}

    >
      <Defs>
        {/* Sharp Shine Line */}
        <LinearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
          <Stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
          <Stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
        </LinearGradient>
      </Defs>

      {/* Main Arc */}
      <Path
        d={`M0,${ARC_HEIGHT} Q${width / 2},-20 ${width},${ARC_HEIGHT} L${width},${ARC_HEIGHT + 10} L0,${ARC_HEIGHT + 10} Z`}
        fill="#1A1A1A"
      />

      {/* Shiny line */}
      <Path
        d={`M0,${ARC_HEIGHT} Q${width / 2},-20 ${width},${ARC_HEIGHT}`}
        stroke="url(#shine)"
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
};

export default ArcView;
