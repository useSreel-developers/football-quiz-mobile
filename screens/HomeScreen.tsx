import {View, Text, Image, Pressable, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLogin} from '../hooks/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}: any) => {
  const [user, setUser] = useState<string | null>(null);
  const {onGoogleLogoutPress} = useLogin();

  const getUser = async () => {
    const nameUser = await AsyncStorage.getItem('user');
    setUser(nameUser);
  };

  useEffect(() => {
    getUser();
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hallo</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('Quiz')} />
      <Button
        title="Logout"
        onPress={() =>
          onGoogleLogoutPress().then(() => navigation.navigate('Login'))
        }
      />
    </View>
  );
};

export default HomeScreen;
