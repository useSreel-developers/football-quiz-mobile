import {View, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons//FontAwesome6';
import React from 'react';
import {
  Box,
  Text,
  Button,
  ButtonText,
  Image,
  Pressable,
} from '@gluestack-ui/themed';
import {setIsDiamond} from '../redux/sliceUser';
import {useDispatch, useSelector} from 'react-redux';

export default function Diamond() {
  useSelector((state: any) =>
    console.log('diamondreduc', state.user.isDiamond),
  );

  const isDiamond = useSelector((state: any) => state.user.isDiamond);
  const dispatch = useDispatch();
  return (
    <View style={{display: 'flex'}}>
      <View style={{display: 'flex', alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#ffb703',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
          }}
          onPress={() => dispatch(setIsDiamond(!isDiamond))}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            💎 0{/* {user?.diamond} */}
          </Text>
          <FontAwesome6
            name="cart-plus"
            size={20}
            color="green"
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
