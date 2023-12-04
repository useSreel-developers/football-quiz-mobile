import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const PaymentScreen = () => {
  const route: any = useRoute();
  const urlMidtrans: any = route?.params?.url;
  return <WebView source={{uri: urlMidtrans}} />;
};

export default PaymentScreen;
