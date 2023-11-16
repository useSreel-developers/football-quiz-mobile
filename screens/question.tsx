import { View, Text } from "react-native";
import React from "react";
import Bg2 from "../components/Bg2";

const question = () => {
  return (
    <Bg2>
      <View
        style={{ position: "relative", marginTop: 68, display: "flex", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)", margin: 10, borderRadius: 10, borderWidth: 1, borderColor: "green" }}
      >
        <Text> textInComponent </Text>
        {/* ini komponent piala */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#869f00",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "green",
            position: "absolute",
            top: -25,
            right: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>🏆</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffb703" }}>2000</Text>
        </View>
      </View>
    </Bg2>
  );
};

export default question;
