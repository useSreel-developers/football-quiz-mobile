import {View, TouchableOpacity, Linking} from 'react-native';
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
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../utlis/api';
import { listDiamond } from '../data/diamond';

export default function Diamond() {

  const {data: user, refetch} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {data} = await API.get('/check', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
      return data.data;
    },
    refetchInterval: 1000,
  });

  const isDiamond = useSelector((state: any) => state.user.isDiamond);
  const dispatch = useDispatch();

  async function purchaseDiamond() {
    const dataDiamond = {
      order_id: listDiamond[0].id,
      total: listDiamond[0].price,
      diamond: listDiamond[0].diamond,
      name: user?.name,
      email: user?.email,
    }

    const response = await fetch('/process-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      },
      body: JSON.stringify(dataDiamond),
    });

    const data = await response.json();

    if (data.message === 'success') {
      // redirect to payment page
      Linking.openURL(data.url);
      setTimeout(() => {
        refetch();
      }, 5000);
    } else {
      // handle error
      console.error(data.message);
    }
  }

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
          onPress={() => {
            dispatch(setIsDiamond(!isDiamond));
            purchaseDiamond();
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            💎 {user?.diamond}
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