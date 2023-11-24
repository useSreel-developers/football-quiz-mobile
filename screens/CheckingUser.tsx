import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLottieView from '../components/AppLottieView';

const StackNavigator = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const token = AsyncStorage.getItem('token');

  if (user !== null) {
    setIsLoading(false);
  } else {
    setIsLoading(true);
  }

  if (user?.user !== null || token !== null) {
    navigation.navigate('Home');
  } else {
    navigation.navigate('Login');
  }

  return (
    <View>
      {isLoading && (
        <View>
          <AppLottieView
            source={require('../assets/animation/AnimationLoading.json')}
            autoPlay
            loop
            speed={1.5}
            style={{width: 70, height: 70}}
          />
          <Text>Tunggu Sebentar</Text>
        </View>
      )}
    </View>
  );
};

export default StackNavigator;
