import { ImageBackground } from "react-native";

function WinnerBG({ children }: any) {
  return (
    <ImageBackground source={require("../assets/winnerBg.png")} style={{ flex: 1 }}>
      {children}
    </ImageBackground>
  );
}

export default WinnerBG;
