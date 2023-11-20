import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import question from '../data/question';
// import Icon from 'react-native-vector-icons/AntDesign';

const QuizScreen = ({navigation}: any) => {
  const data = question;

  const totalQuestion = data.length;

  const answer: any = [];

  // points
  const [points, setPoints] = useState(0);
  // index of the question
  const [index, setIndex] = useState(0);
  // answer status (true or false)
  const [answerStatus, setAnswerStatus] = useState<boolean | null>(null);
  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  // counter
  const [counter, setCounter] = useState(15);
  //   interval
  let interval: any = null;
  // progress bar
  const progressPercentage = Math.floor((index / totalQuestion) * 100);

  const currentQuestion = data[index];

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints(points => points + 20);
        setAnswerStatus(true);
        answer.push({question: index + 1, answer: true});
      } else {
        setAnswerStatus(false);
        answer.push({question: index + 1, answer: false});
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter(counter => counter - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(15);
      }
    };
    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (index + 1 > data.length) {
      navigation.navigate('Result', {
        answers: answer,
        points: points,
      });
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  return (
    <SafeAreaView>
      {/* Headers */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>Quiz Challenge</Text>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: 'magenta',
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {counter}
          </Text>
        </Pressable>
      </View>

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

      {/* End Headers */}

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
          backgroundColor: '#F0F8FF',
          padding: 10,
          borderRadius: 6,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'serif',
            color: 'black',
          }}>
          {currentQuestion?.question}
        </Text>
        <View>
          {currentQuestion?.options.map((item: any, index: any) => (
            <Pressable
              style={
                selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex
                  ? {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: '#00FFFF',
                      marginVertical: 15,
                      borderRadius: 20,
                      backgroundColor: 'green',
                    }
                  : selectedAnswerIndex !== null &&
                    selectedAnswerIndex === index
                  ? {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: '#00FFFF',
                      marginVertical: 15,
                      borderRadius: 20,
                      backgroundColor: 'red',
                    }
                  : {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: '#00FFFF',
                      marginVertical: 15,
                      borderRadius: 20,
                    }
              }
              key={index}
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAnswerIndex(index)
              }>
              {/* {selectedAnswerIndex === index &&
              index === currentQuestion?.correctAnswerIndex ? (
                <Icon
                  name="checkcircle"
                  style={{
                    borderColor: '#00FFFF',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                  size={20}
                  color="white"
                />
              ) : selectedAnswerIndex !== null &&
                selectedAnswerIndex === index ? (
                <Icon
                  name="close"
                  style={{
                    borderColor: '#00FFFF',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                  size={20}
                  color="white"
                />
              ) : (
                <Text
                  style={{
                    borderColor: '#00FFFF',
                    textAlign: 'center',
                    fontSize: 18,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                    color: 'black',
                  }}>
                  {item.options}.
                </Text>
              )} */}
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  alignItems: 'center',
                  color: 'black',
                }}>
                {item.answer}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={
          answerStatus === null
            ? null
            : {
                marginTop: 45,
                backgroundColor: '#F0F8FF',
                padding: 10,
                borderRadius: 7,
                height: 120,
              }
        }>
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus === null
                ? null
                : {
                    fontSize: 17,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                  }
            }>
            {!answerStatus ? 'Wrong Answer' : 'Correct Answer'}
          </Text>
        )}

        {index + 1 >= question.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate('Result', {
                points: points,
                answer: answer,
              });
            }}
            style={{
              backgroundColor: 'green',
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              borderRadius: 6,
            }}>
            <Text style={{color: 'white'}}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: 'green',
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              borderRadius: 6,
            }}>
            <Text style={{color: 'white'}}>Next Question</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
