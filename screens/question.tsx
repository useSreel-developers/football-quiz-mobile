import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Bg2 from "../components/Bg2";
import { Icon } from "react-native-elements";
import dummy from "../mocks/dummy.json";
import { InputField } from "@gluestack-ui/themed";

const question = () => {
  const [isOpenAnswer, setIsOpenAnswer] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [isTrue, setIsTrue] = React.useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    if (isOpenAnswer) return;
    setIsOpenAnswer(!isOpenAnswer);
    setSelectedAnswer(index);
    setIsTrue(dummy[0].correctAnswerIndex === index);
  };

  return (
    <Bg2>
      <View
        style={{
          position: "relative",
          marginTop: 68,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "green",
          padding: 10,
        }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", width: "100%" }}>
          <Image
            source={{
              uri:
                isOpenAnswer && isTrue
                  ? "https://media2.giphy.com/media/l0FP53519GcImDf1U8/200w.webp?cid=ecf05e47gr8xi4a4rw1dt11299ruce1kd0wqh9fz4u10h9qz&ep=v1_stickers_search&rid=200w.webp&ct=s"
                  : isOpenAnswer && !isTrue
                  ? "https://media0.giphy.com/media/RAquh63pTB2PerLhud/200w.webp?cid=ecf05e47604g4vlm2g81578zfsmtjwqpiow5oxszydz27f9u&ep=v1_stickers_search&rid=200w.webp&ct=s"
                  : "https://giphy.com/stickers/Dentsply-Sirona-Iberia-time-quiz-0qcZHfDmy105Iozsrv",
            }}
            alt="image"
            style={{ width: 90, height: 50, position: "absolute", top: -100, zIndex: 99 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#ccff33", marginBottom: 10, borderWidth: 2, borderColor: "green", borderRadius: 10, padding: 10, backgroundColor: "grey" }}>00:20</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#f4f3ee", textAlign: "justify" }}> {dummy[0].question}</Text>
          <View style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
            {dummy[0].options.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => handleAnswer(index)}
                  style={{
                    //bg akan berwarna hijau ketika jawaban benar, warna merah ketika jawaban salah
                    backgroundColor: isOpenAnswer && index === dummy[0].correctAnswerIndex ? "green" : selectedAnswer === index ? "red" : "#0077b6",
                    padding: 10,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold", color: "#f4f3ee", textAlign: "justify" }}>{`${item.options}. ${item.answer}`}</Text>
                  {isOpenAnswer && index === dummy[0].correctAnswerIndex && index === selectedAnswer ? ( //ikon jika jawaban benar
                    <Icon name="check" type="font-awesome" color="white" />
                  ) : selectedAnswer === index ? (
                    <Icon name={"times"} type="font-awesome" color="white" /> //ikon ketika jawaban salah
                  ) : (
                    ""
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
