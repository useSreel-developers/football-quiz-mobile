import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../utlis/api';
import {useDispatch} from 'react-redux';

export const useLogin = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();

    const body = {
      name: userInfo.user.name,
      email: userInfo.user.email,
    };
    await API.post('/google-auth', body).then(res => {
      AsyncStorage.setItem('token', res.data.token);
    });

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function onGoogleLogoutPress() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await AsyncStorage.clear();
      // setData(null);
    } catch (error) {
      console.error(error);
    }
  }

  return {onGoogleButtonPress, onGoogleLogoutPress};
};
