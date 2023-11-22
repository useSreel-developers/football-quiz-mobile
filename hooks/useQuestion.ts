import React, {useState, useEffect} from 'react';
import question from '../data/question';
import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useQuestion = () => {
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
  const [counter, setCounter] = useState(10);
  // avatar
  const [avatar, setAvatar] = useState<boolean>(false);
  //   interval
  let interval: any = null;
  // progress bar
  const progressPercentage = Math.floor((index / totalQuestion) * 100);

  const currentQuestion = data[index];

  const [dataUser, setDataUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await API.get('/check', {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        });
        setDataUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // refetch points answer
  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints(points => points + 100 * counter);
        setAnswerStatus(true);
        answer.push({question: index + 1, answer: true});
      } else {
        setAnswerStatus(false);
        answer.push({question: index + 1, answer: false});
      }
    }
  }, [selectedAnswerIndex]);

  // refetch answer null
  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  // refetch interval question
  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter(counter => counter - 1);
      }
      if (counter === 0) {
        setTimeout(() => {
          setIndex(index + 1);
          setCounter(10);
          setAvatar(false);
        }, 3000);
        setAvatar(true);
      }
    };
    interval = setTimeout(myInterval, 1000);

    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (!interval) {
      setCounter(10);
    }
  }, [index]);

  return {
    index,
    data,
    avatar,
    answer,
    points,
    dataUser,
    currentQuestion,
    counter,
    totalQuestion,
    progressPercentage,
    selectedAnswerIndex,
    setSelectedAnswerIndex,
  };
};
