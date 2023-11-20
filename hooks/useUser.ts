import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../utlis/api';

export const useUser = () => {
  const [dataAvatar, setDataAvatar] = useState<any>(null);
  const getDataAvatar = async () => {
    const response = await API.get('/avatars', {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });
    setDataAvatar(response.data.data);
  };

  useEffect(() => {
    getDataAvatar();
  }, []);

  return {dataAvatar};
};
