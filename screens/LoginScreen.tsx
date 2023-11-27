import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Bg1 from '../components/Bg1';
import {Icon} from 'react-native-elements';
import {useLogin} from '../hooks/useLogin';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {API} from '../utlis/api';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user);
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();

      const body = {
        name: userInfo.user.name,
        email: userInfo.user.email,
      };
      const response = await API.post('/google-auth', body);
      AsyncStorage.setItem('token', response.data.token);
      if (response.data.code === 200) {
        navigation.navigate('Home');
      } else if (response.data.code === 201) {
        navigation.navigate('ChooseAvatar');
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }
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
          onPress={onGoogleButtonPress}>
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
