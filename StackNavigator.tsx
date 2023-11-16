import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import HomeScreen from './screens/HomeScreen';
import ButtonLogin from './components/ButtonLogin';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const dispatch = useAppDispatch();
  //   const {
  //     data: profileData,
  //     isLoading,
  //     isError,
  //     error,r
  //   } = useAppSelector(state => state.profile);
  //   console.log(profileData);

  // useEffect(() => {
  //   dispatch(getProfile());
  // });

  return (
    <NavigationContainer>
      {!AsyncStorage.getItem('user') ? (
        <Stack.Navigator>
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={ButtonLogin}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
