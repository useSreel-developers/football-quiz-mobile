import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Bg2 from '../components/Bg2';
import {useQuestion} from '../hooks/useQuestion';
import {renderQuestion} from '../components/Quiz/renderQuestion';
import {renderOptions} from '../components/Quiz/renderOptions';
import AppLottieView from '../components/AppLottieView';
import {Pressable} from '@gluestack-ui/themed';
import {useAtom} from 'jotai';
import {
  options,
  roomId,
  socketConnectionAtom,
  temporaryAnswer,
} from '../globals/GlobalData';

const QuizScreen = ({navigation}: any) => {
  const [socketConnection] = useAtom(socketConnectionAtom);
  const [roomIdQuiz, setRoomIdQuiz] = useAtom(roomId);
  const [optionsUser, setOptionsUser] = useAtom(options);
  const {currentQuestionIndex, dataQuestion, dataUser, counter, score} =
    useQuestion();

  const [temporaryAnswerUser, setTemporaryAnswerUser] =
    useAtom(temporaryAnswer);

  useEffect(() => {
    let answer;
    if (optionsUser?.selectedOptionIndex === 0) {
      answer = 'A';
    } else if (optionsUser?.selectedOptionIndex === 1) {
      answer = 'B';
    } else if (optionsUser?.selectedOptionIndex === 2) {
      answer = 'C';
    } else if (optionsUser?.selectedOptionIndex === 3) {
      answer = 'D';
    } else {
      answer = null;
    }

    if (counter === 0) {
      socketConnection.emit('storeScore', {
        userId: dataUser?.id,
        userAvatar: dataUser?.avatar?.avatar_url,
        roomId: roomIdQuiz,
        answer,
        score: score,
      });
    }

    socketConnection.on('updateTemporaryAnswer', res => {
      setTemporaryAnswerUser(res.temporaryAnswer);
    });
  }, [counter]);

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
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'green',
          padding: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
                  color: 'green',
                  marginBottom: 10,
                  borderWidth: 2,
                  borderColor: 'green',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#ffb703',
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
          <Text style={{fontWeight: 'bold', color: '#ffb703'}}>
            Your Progress
          </Text>
          <Text style={{fontWeight: 'bold', color: '#ffb703'}}>
            ({currentQuestionIndex + 1}/{dataQuestion.length}) questions
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
