import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function UserName() {
  const userName = useSelector((state: any) => state.user.user?.name);

  return (
    <View>
      <Text style={{color: 'white', fontWeight: 'bold'}}>{userName}</Text>
    </View>
  );
}
