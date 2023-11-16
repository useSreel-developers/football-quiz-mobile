import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Bg1 from "../components/Bg1";
import { Icon } from "react-native-elements";

const Auth = () => {
  return (
    <Bg1>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity style={{ backgroundColor: "white", marginBottom: 80, display: "flex", flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 10, borderWidth: 2 }}>
          <Icon name="google" type="font-awesome" />
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Continue With Google</Text>
        </TouchableOpacity>
      </View>
    </Bg1>
  );
};

export default Auth;
