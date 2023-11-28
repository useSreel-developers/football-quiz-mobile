import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLottieView from '../components/AppLottieView';
import Bg1 from '../components/Bg1';

const StackNavigator = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      setIsLoading(false);
      if (token === null) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    }, 3000);
    setIsLoading(true);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Bg1>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {isLoading && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <AppLottieView
              source={require('../assets/animation/AnimationCheckingUser.json')}
              autoPlay
              loop
              speed={0.5}
              style={{width: 100, height: 100}}
            />
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Tunggu Sebentar
            </Text>
          </View>
        )}
      </View>
    </Bg1>
  );
};

export default StackNavigator;
