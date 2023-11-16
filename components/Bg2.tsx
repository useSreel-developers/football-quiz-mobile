import { ImageBackground } from "react-native";
import React from "react";

const Bg2 = ({ children }: any) => {
  return (
    <ImageBackground source={require("../assets/triviaBG2.png")} style={{ flex: 1 }}>
      {children}
    </ImageBackground>
  );
};

export default Bg2;
