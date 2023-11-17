import ChooseAvatar from '../screens/ChooseAvatar';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import HomeScreen from '../screens/HomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const LoginnedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
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
  );
};
