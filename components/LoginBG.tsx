import {ImageBackground} from 'react-native';
import React from 'react';

const LoginBG = ({children}: any) => {
  return (
    <ImageBackground
      source={require('../assets/loginBG.png')}
      style={{flex: 1}}
      alt="backgrond image">
      {children}
    </ImageBackground>
  );
};

export default LoginBG;
