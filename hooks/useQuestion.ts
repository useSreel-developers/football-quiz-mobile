import React, {useState, useEffect} from 'react';
import {data} from '../data/question';

import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useQuestion = () => {
  const allQuestion = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [counter, setCounter] = useState(10);
  const [avatar, setAvatar] = useState(false);

  let interval: any = null;

  const validateAnswer = (selectedOption: any) => {
    let correct_option = allQuestion[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    if (selectedOption === correct_option) {
      // set score
      setScore(score => score + 1);
    }

    // show next button
  };
  // refetch interval question
  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter(counter => counter - 1);
      }
      if (counter === 0) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setCounter(10);
          setAvatar(false);
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
