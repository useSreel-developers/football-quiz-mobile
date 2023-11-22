import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import question from '../data/question';
import question from '../data/question';
import Bg2 from '../components/Bg2';
import {useQuestion} from '../hooks/useQuestion';
import {Box, ButtonText, Image} from '@gluestack-ui/themed';
// import Icon from 'react-native-vector-icons/AntDesign';

const QuizScreen = ({navigation}: any) => {
  const {
    index,
    data,
    avatar,
    answer,
    dataUser,
    points,
    currentQuestion,
    counter,
    totalQuestion,
    progressPercentage,
    selectedAnswerIndex,
    setSelectedAnswerIndex,
  } = useQuestion();

  useEffect(() => {
    if (index + 1 > data.length) {
      navigation.navigate('Result', {
        answers: answer,
        points: points,
      });
    }
  }, [currentQuestion]);

  return (
    <Bg2>
      <View
        style={{
          position: 'relative',
          marginTop: 68,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'green',
          padding: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#869f00',
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'green',
            position: 'absolute',
            top: -25,
            right: 10,
          }}>
          <Text style={{fontSize: 20}}>🏆</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffb703'}}>
            {points}
          </Text>
        </View>

        {/* Time Question */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Pressable style={{width: 70}}>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#ccff33',
                marginBottom: 10,
                borderWidth: 2,
                borderColor: 'green',
                borderRadius: 10,
                padding: 10,
                backgroundColor: 'grey',
              }}>
              {counter}
            </Text>
          </Pressable>
        </View>
        {/* End Time Question */}

        {/* Count Answer Question */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text>Your Progress</Text>
          <Text>
            ({index + 1}/{totalQuestion}) question
          </Text>
        </View>
        {/* End Count Answer Question */}

        {/* Progress Bar */}
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            height: 10,
            borderRadius: 10,
            justifyContent: 'center',
            marginTop: 20,
            marginLeft: 10,
          }}>
          <Text
            style={{
              backgroundColor: '#FFC0CB',
              borderRadius: 12,
              position: 'absolute',
              left: 0,
              height: 18,
              right: 0,
              width: `${progressPercentage}%`,
              marginTop: 20,
            }}
          />
        </View>
        {/* End Progress Bar */}

        <View
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 6,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'serif',
              color: 'white',
              marginBottom: 20,
            }}>
            {currentQuestion?.question}
          </Text>
          <View>
            {/* Looping Option Answer */}
            {currentQuestion?.options.map((item: any, index: any) => {
              if (counter <= 0) {
                return (
                  <Pressable
                    style={
                      selectedAnswerIndex === index &&
                      index === currentQuestion.correctAnswerIndex
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#00FFFF',
                            marginVertical: 15,
                            borderRadius: 10,
                            backgroundColor: 'green',
                            height: 60,
                          }
                        : selectedAnswerIndex !== null &&
                          selectedAnswerIndex === index
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#00FFFF',
                            marginVertical: 15,
                            borderRadius: 10,
                            backgroundColor: 'red',
                            height: 60,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#00FFFF',
                            marginVertical: 15,
                            borderRadius: 10,
                            backgroundColor: 'grey',
                            height: 60,
                          }
                    }
                    key={index}
                    // onPress={() =>
                    //   selectedAnswerIndex === null && setSelectedAnswerIndex(index)
                    // }
                  >
                    {/* Option Answer */}
                    <Text
                      style={{
                        borderColor: '#00FFFF',
                        textAlign: 'center',
                        fontSize: 18,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        padding: 10,
                        color: 'white',
                      }}>
                      {item.options}.
                    </Text>
                    {/* End Option Answer */}

                    {/* Answer */}
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        alignItems: 'center',
                        color: 'white',
                      }}>
                      {item.answer}
                    </Text>
                    {/* End Answer */}

                    {avatar && selectedAnswerIndex === index ? (
                      <Image
                        source={dataUser?.avatar?.avatar_url}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                        role="img"
                        alt="Avatar User"
                      />
                    ) : null}
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    style={
                      selectedAnswerIndex === index &&
                      index === currentQuestion.correctAnswerIndex
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#00FFFF',
                            marginVertical: 15,
                            borderRadius: 10,
                            backgroundColor: 'green',
                            height: 60,
                          }
                        : selectedAnswerIndex !== null &&
                          selectedAnswerIndex === index
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#00FFFF',
                            marginVertical: 15,
                            borderRadius: 10,
                            backgroundColor: 'red',
                            height: 60,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: '#00FFFF',
                            marginVertical: 15,
                            borderRadius: 10,
                            backgroundColor: 'grey',
                            height: 60,
                          }
                    }
                    key={index}
                    onPress={() =>
                      selectedAnswerIndex === null &&
                      setSelectedAnswerIndex(index)
                    }>
                    {/* Option Answer */}
                    <Text
                      style={{
                        borderColor: '#00FFFF',
                        textAlign: 'center',
                        fontSize: 18,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        padding: 10,
                        color: 'white',
                      }}>
                      {item.options}.
                    </Text>
                    {/* End Option Answer */}

                    {/* Answer */}
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        alignItems: 'center',
                        color: 'white',
                      }}>
                      {item.answer}
                    </Text>
                    {/* End Answer */}

                    {avatar && selectedAnswerIndex === index ? (
                      <Image
                        source={dataUser?.avatar?.avatar_url}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                        role="img"
                        alt="Avatar User"
                      />
                    ) : null}
                  </Pressable>
                );
              }
            })}
            {/* End Looping Option Answer */}
          </View>
        </View>
      </View>
    </Bg2>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
