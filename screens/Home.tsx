import { Box, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import React from "react";
import Bg2 from "../components/Bg2";

const Home = () => {
  const [isDiamond, setIsDiamond] = React.useState(false);
  return (
    <Bg2>
      <Box style={{ marginTop: 25, flex: 1, marginHorizontal: 10, position: "relative" }}>
        <Box style={{ display: "flex", alignItems: "flex-end" }}>
          <Box style={{ backgroundColor: "#869f00", padding: 5, borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>💎 21</Text>
            <TouchableOpacity style={{ backgroundColor: "yellow", paddingHorizontal: 10, borderRadius: 10 }} onPress={() => setIsDiamond(!isDiamond)}>
              <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box>
          <Text>Content</Text>
        </Box>
        {isDiamond && (
          <Box
            style={{
              position: "absolute",
              top: 80,
              left: 0,
              right: 0,
              bottom: 80,
              backgroundColor: "#869f00",
              borderRadius: 20,
              padding: 10,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Box style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={{ backgroundColor: "#e5c900", borderWidth: 2, borderColor: "white", padding: 10, borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>100</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎💎</Text>
                <Text style={{ color: "green", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>Rp. 84.000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#e5c900", borderWidth: 2, borderColor: "white", padding: 10, borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>100</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎💎</Text>
                <Text style={{ color: "green", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>Rp. 84.000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#e5c900", borderWidth: 2, borderColor: "white", padding: 10, borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>100</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎💎</Text>
                <Text style={{ color: "green", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>Rp. 84.000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#e5c900", borderWidth: 2, borderColor: "white", padding: 10, borderRadius: 10, margin: 5, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>100</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎</Text>
                <Text style={{ color: "yellow", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>💎💎💎</Text>
                <Text style={{ color: "green", fontWeight: "bold", fontSize: 24, lineHeight: 24 }}>Rp. 84.000</Text>
              </TouchableOpacity>
            </Box>
            <Box position="absolute" bottom={10} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={10}>
              <Button style={{ backgroundColor: "red" }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button style={{ backgroundColor: "blue" }}>
                <ButtonText>Purchase</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Bg2>
  );
};

export default Home;
