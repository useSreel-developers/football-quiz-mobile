import { ImageBackground } from "react-native";
import React from "react";

const Bg1 = ({ children }: any) => {
  return (
    <ImageBackground source={require("../assets/triviaBG.png")} style={{ flex: 1 }}>
      {children}
    </ImageBackground>
  );
};

export default Bg1;
