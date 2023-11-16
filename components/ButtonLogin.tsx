import {View, Button, Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import {useLogin} from '../hooks/useLogin';

const ButtonLogin = ({navigation}: any) => {
  const {onGoogleButtonPress} = useLogin();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Sign in with Google"
        onPress={() =>
          onGoogleButtonPress().then(() => navigation.navigate('Home'))
        }
      />
    </View>
  );
};

export default ButtonLogin;
