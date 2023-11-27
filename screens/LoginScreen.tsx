import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Bg1 from '../components/Bg1';
import {Icon} from 'react-native-elements';
import {useLogin} from '../hooks/useLogin';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user);
  const {onGoogleButtonPress} = useLogin();
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
  };

  useEffect(() => {
    getToken();
  });

  return (
    <Bg1>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginBottom: 80,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            borderWidth: 2,
          }}
          onPress={() =>
            onGoogleButtonPress().then(() => navigation.navigate('Home'))
          }>
          <Icon name="google" type="font-awesome" />
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            Continue With Google
          </Text>
        </TouchableOpacity>
      </View>
    </Bg1>
  );
};

export default LoginScreen;
