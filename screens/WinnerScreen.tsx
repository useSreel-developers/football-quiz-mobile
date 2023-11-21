import { View, Text, Image } from "react-native";
import React from "react";
import WinnerBg from "../components/winnerBG";

const WinnerScreen = () => {
  return (
    <WinnerBg>
      <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text>Congrats you got 1 Diamond</Text>
        <View>
          {/* <Image source="https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais" alt="gambar" /> */}
        </View>
      </View>
    </WinnerBg>
  );
};

export default WinnerScreen;
