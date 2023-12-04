import {
  Box,
  Text,
  Button,
  ButtonText,
  Image,
  Pressable,
} from '@gluestack-ui/themed';
import {TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Bg2 from '../components/homeBG';
import {useLogin} from '../hooks/useLogin';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/useUser';
import FontAwesome6 from 'react-native-vector-icons//FontAwesome6';
import {useQuery} from '@tanstack/react-query';
import {socketConnectionAtom} from '../globals/GlobalData';
import {useAtom} from 'jotai';
import {useAvatar} from '../hooks/useAvatar';
import AppLottieView from '../components/AppLottieView';
import {setIsDiamond} from '../redux/sliceUser';
import {listDiamond} from '../data/diamond';
import _ from 'lodash';
import axios from 'axios';
import WebView from 'react-native-webview';
import {ScrollView} from '@gluestack-ui/themed';
// import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const Home = ({navigation}: any) => {
  const [socketConnection] = useAtom(socketConnectionAtom);
  const {updateDataUser, avatarId, setAvatarId, diamondId, setDiamondId} =
    useAvatar();

  const [isAvatar, setIsAvatar] = React.useState(false);
  const {onGoogleLogoutPress} = useLogin();
  const [dataAvatar, setDataAvatar] = useState<any>(null);
  const [avatarPrice, setAvatarPrice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [diamondPrice, setDiamondPrice] = useState<number | null>(null);
  const [tokenMidtrans, setTokenMidtrans] = useState<string>('');
  const [urlCallback, setUrlCallback] = useState<string>('');

  const isDiamond = useSelector((state: any) => state.user.isDiamond);

  const dispatch = useDispatch();

  useEffect(() => {
    socketConnection.on('connect', () => {
      console.log('connected');
    });
  }, []);

  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {data} = await API.get('/check', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
      setIsLoading(false);
      return data.data;
    },
    refetchInterval: 1000,
  });

  const {data: avatars} = useQuery({
    queryKey: ['avatars'],
    queryFn: async () => {
      const {data} = await API.get('/avatars', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
      setIsLoading(false);
      return data.data;
    },
    refetchInterval: 1000,
  });

  const handleStartGame = () => {
    socketConnection.emit('matchmaking', {
      userId: user?.id,
      userName: user?.name,
      userAvatar: user?.avatar?.avatar_url,
    });
    navigation.replace('FindOpponent');
  };

  const handlePurchaseDiamond = async () => {
    try {
      const data = {
        name: user?.name,
        order_id: _.random(1, 10000),
        total: diamondPrice,
      };

      const response = await axios.post(
        'http://10.0.2.2:5000/api/payment/process-transaction',
        data,
      );
      console.log(response.data);

      setTokenMidtrans(response.data.token);
      // setUrlCallback(response.data.url);
      console.log(urlCallback);

      navigation.navigate('Payment', {
        url: response.data.url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // if (tokenMidtrans !== '') {
  //   InAppBrowser.open(urlCallback);
  // }

  // useEffect(() => {
  //   getDataAvatar();
  // }, []);

  return (
    <Bg2>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffb703',
          }}>
          <AppLottieView
            source={require('../assets/animation/AnimationCheckingUser.json')}
            autoPlay
            loop
            speed={0.5}
            style={{width: 100, height: 100}}
          />
        </View>
      ) : (
        <Box
          style={{
            marginTop: 5,
            flex: 1,
            marginHorizontal: 10,
            position: 'relative',
          }}>
          {/* Edit Avatar */}
          <Box
            style={{
              flex: 1,
              marginTop: 90,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box style-={{postition: 'relative'}}>
              <Pressable
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 30,
                }}
                onPress={() => setIsAvatar(!isAvatar)}>
                <Box>
                  <Image
                    source={{
                      uri: user?.avatar?.avatar_url
                        ? user?.avatar?.avatar_url
                        : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1700712782~exp=1700713382~hmac=05bdd42caf7eadaf1c00c10029f54806c78874461728bc38046315f09e795a16',
                    }}
                    // source={{uri: 'user?.avatar?.avatar_url'}}
                    style={{
                      borderRadius: 50,
                      borderWidth: 4,
                      borderColor: 'green',
                    }}
                    alt={
                      user?.avatar?.avatar_name
                        ? user?.avatar?.avatar_name
                        : 'avatar'
                    }
                    role="img"
                  />
                </Box>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    zIndex: 99,
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 45,
                  }}>
                  <FontAwesome6
                    name={'edit'}
                    style={{
                      color: '#ffb703',
                      fontSize: 25,
                      backgroundColor: 'green',
                      paddingLeft: 5,
                      paddingBottom: 5,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </Pressable>
            </Box>

            <Box style={{position: 'absolute', bottom: 58}}>
              <AppLottieView
                source={require('../assets/animation/AnimationHome.json')}
                autoPlay
                loop
                speed={1}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            </Box>

            <Button
              onPress={handleStartGame}
              mt={25}
              width="70%"
              borderRadius={10}
              style={{
                height: 50,
                backgroundColor: 'green',
                position: 'absolute',
                bottom: 20,
              }}>
              <ButtonText
                style={{
                  fontWeight: 'bold',
                  fontSize: 25,
                  color: 'white',
                  lineHeight: 25,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                Start Game
              </ButtonText>
            </Button>
          </Box>
          {/* End Edit Avatar */}

          {/* Modal Diamond */}
          {isDiamond && (
            <Box
              style={{
                position: 'absolute',
                top: 80,
                left: 0,
                right: 0,
                bottom: 80,
                backgroundColor: 'green',
                borderRadius: 20,
                padding: 10,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                zIndex: 999,
              }}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {listDiamond.map(diamond => (
                  <TouchableOpacity
                    key={diamond.id}
                    onPress={() => {
                      setDiamondId(diamond.id);
                      setDiamondPrice(diamond.price);
                    }}
                    style={
                      diamondId === diamond.id
                        ? {
                            backgroundColor: '#ffb703',
                            borderWidth: 2,
                            borderColor: 'white',
                            padding: 10,
                            borderRadius: 10,
                            margin: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }
                        : {
                            backgroundColor: '#ffb703',
                            borderWidth: 2,
                            borderColor: 'green',
                            padding: 10,
                            borderRadius: 10,
                            margin: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }
                    }>
                    <Text
                      style={{
                        color: 'yellow',
                        fontWeight: 'bold',
                        fontSize: 24,
                        lineHeight: 24,
                      }}>
                      {diamond.diamond}
                    </Text>
                    <Image source={diamond.images} alt="Topup Diamond" />
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 24,
                        lineHeight: 24,
                      }}>
                      Rp. {diamond.price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={10}
                mt={30}>
                <Button
                  style={{backgroundColor: 'red'}}
                  onPress={() => dispatch(setIsDiamond(!isDiamond))}>
                  <ButtonText>Cancel</ButtonText>
                </Button>
                {diamondId === null ? (
                  <Button style={{backgroundColor: 'grey'}}>
                    <ButtonText>Purchase</ButtonText>
                  </Button>
                ) : (
                  <Button
                    onPress={handlePurchaseDiamond}
                    style={{backgroundColor: 'blue'}}>
                    <ButtonText>Purchase</ButtonText>
                  </Button>
                )}
              </Box>
            </Box>
          )}

          {/* Modal Avatar */}
          {isAvatar && (
            <Box
              style={{
                position: 'absolute',
                top: 30,
                left: 0,
                right: 0,
                bottom: 20,
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 20,
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                zIndex: 999,
                flexWrap: 'wrap',
                gap: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  lineHeight: 20,
                  fontWeight: 'bold',
                }}>
                Choose Your Avatar
              </Text>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 40,
                  flexWrap: 'wrap',
                  padding: 10,
                  marginTop: 20,
                  height: 420,
                }}>
                <ScrollView horizontal={true}>
                  {avatars.map((avatar: any, index: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setAvatarId(avatar.id);
                          setAvatarPrice(avatar.price);
                        }}
                        key={index}
                        style={
                          avatarId === avatar.id
                            ? {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                borderWidth: 2,
                                borderColor: 'white',
                                padding: 10,
                                borderRadius: 10,
                                backgroundColor: '#ffb703',
                                width: 300,
                                height: 400,
                                justifyContent: 'space-evenly',
                                marginRight: 10,
                              }
                            : {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                borderWidth: 2,
                                borderColor: 'green',
                                padding: 10,
                                borderRadius: 10,
                                backgroundColor: '#ffb703',
                                width: 300,
                                height: 400,
                                justifyContent: 'space-evenly',
                                marginRight: 10,
                              }
                        }>
                        <Image
                          source={avatar.avatar_url}
                          style={{
                            borderRadius: 150,
                            borderWidth: 2,
                            borderColor: 'green',
                            width: 250,
                            height: 250,
                          }}
                          alt="ini gambar"
                          role="img"
                        />
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 40,
                            lineHeight: 40,
                          }}>
                          {avatar.price === 0
                            ? 'Free'
                            : avatar.owned === true
                            ? 'Use'
                            : `${avatar.price} 💎`}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap={10}
                mb={30}>
                <Button
                  style={{backgroundColor: 'red'}}
                  onPress={() => setIsAvatar(false)}>
                  <ButtonText>Cancel</ButtonText>
                </Button>
                {avatarId === null ? (
                  <Button disabled style={{backgroundColor: 'grey'}}>
                    <ButtonText>Save</ButtonText>
                  </Button>
                ) : (
                  <Button
                    onPress={() => {
                      updateDataUser();
                      setIsAvatar(false);
                    }}
                    style={{backgroundColor: 'blue'}}>
                    <ButtonText>Save</ButtonText>
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Bg2>
  );
};

export default Home;
