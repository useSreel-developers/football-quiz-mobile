import React, {useState, useEffect} from 'react';
import {data} from '../data/question';
import {useAtom} from 'jotai';
import {
  options,
  questions,
  socketConnectionAtom,
  temporaryAnswer,
} from '../globals/GlobalData';
import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useQuestion = () => {
  const allQuestion = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [counter, setCounter] = useState<any>();
  const [avatar, setAvatar] = useState(false);
  const [dataUser, setDataUser] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState<any>();

  let interval: any = null;
  const [socketConnection] = useAtom(socketConnectionAtom);

  const [dataQuestion, setDataQuestion] = useAtom(questions);

  const [optionsUser, setOptionsUser] = useAtom(options);

  const [temporaryAnswerUser, setTemporaryAnswerUser] =
    useAtom(temporaryAnswer);

  const getDataUser = async () => {
    const response = await API.get('/check', {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });
    setDataUser(response?.data?.data);
  };

  useEffect(() => {
    socketConnection.on('matchStarted', res => {
      setCounter(res.timeRemaining);
    });

    getDataUser();
  }, []);

  const validateAnswer = (selectedOption: any, selectedOptionIndex: any) => {
    let correct_option = dataQuestion[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setOptionsUser({
      selectedOption,
      selectedOptionIndex,
    });
    setSelectedIndex(selectedOptionIndex);
    if (selectedOption === correct_option) {
      // set score
      setScore(score => score + counter * 100);
    }
  };
  // refetch interval question
  useEffect(() => {
    const myInterval = () => {
      if (counter === 0) {
        // if (currentQuestionIndex === dataQuestion.length - 1) {
        //   // Last Question
        //   // Show Modal Score
        //   // navigation.navigate('Result');
        // } else {
        //   setCurrentQuestionIndex(currentQuestionIndex + 1);
        // }
        setTimeout(() => {
          setCurrentOptionSelected(null);
          setCorrectOption(null);
          setShowNextButton(false);
          setIsOptionDisabled(false);
          setOptionsUser(null);
          // setSelectedIndex(null);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAvatar(false);
          setTemporaryAnswerUser([]);
        }, 5000);
        setAvatar(true);
      }
    };
    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  // useEffect(() => {
  //   if (!interval) {
  //     setCounter(10);
  //   }
  // }, [index]);

  return {
    currentQuestionIndex,
    counter,
    allQuestion,
    dataUser,
    score,
    dataQuestion,
    validateAnswer,
    isOptionDisabled,
    correctOption,
    currentOptionSelected,
    setCurrentQuestionIndex,
    setCurrentOptionSelected,
    setCorrectOption,
    setShowNextButton,
    setIsOptionDisabled,
  };
};
