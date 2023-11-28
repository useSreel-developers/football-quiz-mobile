import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Bg2 from '../components/Bg2';
import {useQuestion} from '../hooks/useQuestion';
import {renderQuestion} from '../components/Quiz/renderQuestion';
import {renderOptions} from '../components/Quiz/renderOptions';
import AppLottieView from '../components/AppLottieView';
import {Pressable} from '@gluestack-ui/themed';

const QuizScreen = ({navigation}: any) => {
  const {
    currentQuestionIndex,
    allQuestion,
    counter,
    setCurrentQuestionIndex,
    setCurrentOptionSelected,
    setCorrectOption,
    setShowNextButton,
    setIsOptionDisabled,
  } = useQuestion();

  const handleNext = () => {
    if (currentQuestionIndex === allQuestion.length - 1) {
      // Last Question
      // Show Modal Score
      navigation.navigate('Result');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setShowNextButton(false);
      setIsOptionDisabled(false);
    }
  };

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
            {/* {points} */}
          </Text>
        </View>

        {/* Time Question */}
        {counter === 0 ? (
          <View>
            <AppLottieView
              source={require('../assets/animation/AnimationLoaderQuiz.json')}
              autoPlay
              loop
              speed={1.5}
              style={{width: 100, height: 100}}
            />
          </View>
        ) : (
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
        )}
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
            ({currentQuestionIndex + 1}/{allQuestion.length}) questions
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
              // backgroundColor: 'green',
              borderRadius: 12,
              position: 'absolute',
              left: 0,
              height: 18,
              right: 0,
              // width: `${progressPercentage}%`,
              marginTop: 20,
            }}
          />
        </View>
        {/* End Progress Bar */}

        {renderQuestion()}
        {renderOptions()}
      </View>
    </Bg2>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
