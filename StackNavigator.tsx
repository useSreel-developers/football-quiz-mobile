// import {View, Text} from 'react-native';
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {AuthStack} from './components/AuthStack';
// import {LoginnedStack} from './components/LoginnedStack';
// import {useSelector} from 'react-redux';
// import {RootState} from './redux/store';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const StackNavigator = () => {
//   const userLogin = useSelector((state: RootState) => state.user);
//   const userId = userLogin.user?.id;
//   console.log(userId);

//   return (
//     <NavigationContainer>
//       {userId === undefined ? <AuthStack /> : <LoginnedStack />}
//     </NavigationContainer>
//   );
// };

// export default StackNavigator;
