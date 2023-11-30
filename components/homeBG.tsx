import {ImageBackground} from 'react-native';
import React from 'react';

const homeBG = ({children}: any) => {
  return (
    <ImageBackground
      source={require('../assets/homeBG.png')}
      style={{flex: 1}}
      alt="backgrond image">
      {children}
    </ImageBackground>
  );
};

export default homeBG;
