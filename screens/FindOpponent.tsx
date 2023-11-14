import React from "react";
import Bg2 from "../components/Bg2";
import { Box, Text, ButtonText, Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

const FindOpponent = () => {
  return (
    <Bg2>
      <Box style={{ marginTop: 25, flex: 1, marginHorizontal: 10 }}>
        <Box display="flex" alignItems="flex-end">
          <TouchableOpacity style={{ backgroundColor: "#869f00", padding: 5, borderRadius: 50 }}>
            <ButtonText>✖</ButtonText>
          </TouchableOpacity>
        </Box>
        <Box style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 72, lineHeight: 80, color: "yellow" }}>00:18</Text>
          <Text style={{ color: "white", fontSize: 35, lineHeight: 38 }}>Finding oponent</Text>
          <Text style={{ color: "white", fontSize: 35, lineHeight: 36 }}>4/5</Text>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "blue",
              width: "100%",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              gap: 10,
              padding: 5,
              marginBottom: 5,
            }}
          >
            <Image source={"https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais"} alt="gambar" style={{ borderRadius: 50, width: 50, height: 50 }} />
            <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>opponent's name</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "blue",
              width: "100%",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              gap: 10,
              padding: 5,
              marginBottom: 5,
            }}
          >
            <Image source={"https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais"} alt="gambar" style={{ borderRadius: 50, width: 50, height: 50 }} />
            <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>opponent's name</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "blue",
              width: "100%",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              gap: 10,
              padding: 5,
              marginBottom: 5,
            }}
          >
            <Image source={"https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais"} alt="gambar" style={{ borderRadius: 50, width: 50, height: 50 }} />
            <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>opponent's name</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "blue",
              width: "100%",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white",
              gap: 10,
              padding: 5,
              marginBottom: 5,
            }}
          >
            <Image source={"https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais"} alt="gambar" role="img" style={{ borderRadius: 50, width: 50, height: 50 }} />
            <Text style={{ color: "white", fontSize: 25, lineHeight: 25 }}>opponent's name</Text>
          </Box>
        </Box>
      </Box>
    </Bg2>
  );
};

export default FindOpponent;
