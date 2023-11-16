import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ButtonLogin from './components/ButtonLogin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import {Provider} from 'react-redux';
import {config} from '@gluestack-ui/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import ChooseAvatar from './screens/ChooseAvatar';
import LoginScreen from './screens/LoginScreen';
import {store} from './redux/store';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '186171516922-hdtojqacvqs2bdpaaj9qvvmtbvbrgcsb.apps.googleusercontent.com',
  });
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChooseAvatar"
              component={ChooseAvatar}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
