import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import {Provider, useSelector} from 'react-redux';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, Text, View} from '@gluestack-ui/themed';
import ChooseAvatar from './screens/ChooseAvatar';
import LoginScreen from './screens/LoginScreen';
import {RootState, store} from './redux/store';
import CheckingToken from './screens/CheckingToken';
import FindOpponent from './screens/FindOpponent';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons//FontAwesome6';
import Diamond from './components/Diamond';
import {useLogin} from './hooks/useLogin';
import useName from './components/UserName';
import UserName from './components/UserName';
import PaymentScreen from './screens/PaymentScreen';

// const userName = useName();
const App = () => {
  const {onGoogleLogoutPress} = useLogin();
  GoogleSignin.configure({
    webClientId:
      '186171516922-hdtojqacvqs2bdpaaj9qvvmtbvbrgcsb.apps.googleusercontent.com',
  });
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="CheckingUser"
                component={CheckingToken}
                options={{headerShown: false}}
              />
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
                options={({navigation}) => ({
                  title: ``,
                  headerLeft: () => (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          onGoogleLogoutPress().then(() =>
                            navigation.navigate('Login'),
                          )
                        }>
                        <FontAwesome6
                          name="arrow-left"
                          size={24}
                          color="#ffb703"
                        />
                      </TouchableOpacity>
                      <UserName />
                    </View>
                  ),
                  headerRight: () => (
                    <View>
                      {/* Diamond User */}
                      <Diamond />
                      {/* End Diamond User */}
                    </View>
                  ),
                  headerBackground: () => (
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="FindOpponent"
                component={FindOpponent}
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
              <Stack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar hidden={true} />
        </GluestackUIProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
