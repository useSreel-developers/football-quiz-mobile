import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackNavigator = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user);
  const token = AsyncStorage.getItem('token');
  // console.log(user);

  if (user?.user === null && !token) {
    navigation.navigate('Login');
  } else {
    navigation.navigate('Home');
  }

  return (
    <View>
      <Text>Selamat Datang</Text>
    </View>
  );
};

export default StackNavigator;
