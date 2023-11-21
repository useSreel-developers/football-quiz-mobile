import { View, Text, Image } from "react-native";
import React from "react";
import WinnerBg from "../components/winnerBG";

const WinnerScreen = () => {
  return (
    <WinnerBg>
      <View style={{ flex: 1, display: "flex", alignItems: "center", marginTop: 185, position: "relative" }}>
        <Text style={{ color: "white", fontSize: 25, fontWeight: "900" }}>
          1<Text style={{ color: "#669bbc" }}>💎</Text> for you
        </Text>
        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", top: 60 }}>
          {/* ini view yang dibawah nanti di ganti image/avatar */}
          <View style={{ width: 70, height: 70, backgroundColor: "red", borderRadius: 50 }}></View>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 10 }}>NAME OF THE PLAYER</Text>
          <Text style={{ color: "orange", fontWeight: "900" }}>7170</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", left: 10, top: 90 }}>
          {/* ini view yang dibawah nanti di ganti image/avatar */}
          <View style={{ width: 70, height: 70, backgroundColor: "red", borderRadius: 50 }}></View>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 10 }}>NAME OF THE PLAYER</Text>
          <Text style={{ color: "orange", fontWeight: "900" }}>7170</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", right: 10, top: 100 }}>
          {/* ini view yang dibawah nanti di ganti image/avatar */}
          <View style={{ width: 70, height: 70, backgroundColor: "red", borderRadius: 50 }}></View>
          <Text style={{ color: "white", fontWeight: "900", fontSize: 10 }}>NAME OF THE PLAYER</Text>
          <Text style={{ color: "orange", fontWeight: "900" }}>7170</Text>
        </View>
      </View>
    </WinnerBg>
  );
};

export default WinnerScreen;
