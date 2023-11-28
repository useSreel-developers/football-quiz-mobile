import {
  Box,
  Text,
  Button,
  ButtonText,
  Image,
  // CheckCircleIcon,
  // Alert,
  // AlertIcon,
  // VStack,
  // AlertText,
  // HStack,
  // Spinner,
  Pressable,
} from '@gluestack-ui/themed';
import {TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Bg2 from '../components/Bg2';
import {useLogin} from '../hooks/useLogin';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/useUser';
import {Icon} from 'react-native-elements';
import {useQuery} from '@tanstack/react-query';
import {socketConnectionAtom} from '../globals/GlobalData';
import {useAtom} from 'jotai';
import {useAvatar} from '../hooks/useAvatar';
import AppLottieView from '../components/AppLottieView';

const Home = ({navigation}: any) => {
  const [socketConnection] = useAtom(socketConnectionAtom);
  const {updateDataUser, avatarId, setAvatarId} = useAvatar();

  const [isDiamond, setIsDiamond] = React.useState(false);
  const [isAvatar, setIsAvatar] = React.useState(false);
  const {onGoogleLogoutPress} = useLogin();
  // const {dataAvatar} = useUser();
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataAvatar, setDataAvatar] = useState<any>(null);
  const [avatarPrice, setAvatarPrice] = useState<any>(null);

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
      return data.data;
    },
    refetchInterval: 1000,
  });

  const getDataAvatar = async () => {
    try {
      const response = await API.get('/avatars', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
      setDataAvatar(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartGame = () => {
    socketConnection.emit('matchmaking', {
      userId: user?.id,
      userName: user?.name,
      userAvatar: user?.avatar?.avatar_url,
    });
    navigation.replace('FindOpponent');
  };

  useEffect(() => {
    // getUserData();
    getDataAvatar();
  }, []);

  return (
    <Bg2>
      <Box
        style={{
          marginTop: 5,
          flex: 1,
          marginHorizontal: 10,
          position: 'relative',
        }}>
        {/* Diamond User */}
        <Box style={{display: 'flex', alignItems: 'flex-end'}}>
          <Box
            style={{
              backgroundColor: '#869f00',
              padding: 10,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'yellow',
              borderWidth: 1,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              💎 {user?.diamond}{' '}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'yellow',
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
              onPress={() => setIsDiamond(!isDiamond)}>
              <Text style={{color: 'green', fontWeight: 'bold', fontSize: 20}}>
                +
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        {/* End Diamond User */}

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
                    borderWidth: 2,
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
                  left: 40,
                  zIndex: 99,
                  backgroundColor: 'transparent',
                }}>
                <Icon name="edit" type="font-awesome" color="green" />
              </View>
            </Pressable>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              {user?.name}
            </Text>
          </Box>

          {/* <View>
            <AppLottieView
              source={require('../assets/animation/AnimationHome.json')}
              autoPlay
              loop
            />
          </View> */}

          <Box>
            <AppLottieView
              source={require('../assets/animation/AnimationHome.json')}
              autoPlay
              loop
              style={{width: 500, height: 200}}
            />
          </Box>

          <Button
            onPress={handleStartGame}
            mt={25}
            width="70%"
            borderRadius={10}
            style={{height: 50, backgroundColor: '#004aad'}}>
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
          <Button
            onPress={() =>
              onGoogleLogoutPress().then(() => navigation.navigate('Login'))
            }
            width="70%"
            borderRadius={10}
            style={{
              height: 50,
              backgroundColor: '#ff0000',
              marginTop: 20,
            }}>
            <ButtonText
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              Logout
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
              backgroundColor: '#869f00',
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
              <TouchableOpacity
                style={{
                  backgroundColor: '#e5c900',
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  100
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎💎
                </Text>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  Rp. 84.000
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#e5c900',
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  100
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎💎
                </Text>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  Rp. 84.000
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#e5c900',
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  100
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎💎
                </Text>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  Rp. 84.000
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#e5c900',
                  borderWidth: 2,
                  borderColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                  margin: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  100
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎
                </Text>
                <Text
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  💎💎💎
                </Text>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 24,
                    lineHeight: 24,
                  }}>
                  Rp. 84.000
                </Text>
              </TouchableOpacity>
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
                onPress={() => setIsDiamond(false)}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button style={{backgroundColor: 'blue'}}>
                <ButtonText>Purchase</ButtonText>
              </Button>
            </Box>
          </Box>
        )}

        {/* Modal Avatar */}
        {isAvatar && (
          <Box
            style={{
              position: 'absolute',
              top: 80,
              left: 0,
              right: 0,
              bottom: 80,
              backgroundColor: '#869f00',
              padding: 5,
              borderRadius: 20,
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              zIndex: 999,
            }}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
                flexWrap: 'wrap',
              }}>
              {dataAvatar.map((avatar: any, index: any) => {
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
                            backgroundColor: '#e5c900',
                          }
                        : {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            borderWidth: 2,
                            borderColor: 'green',
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: '#e5c900',
                          }
                    }>
                    <Image
                      source={avatar.avatar_url}
                      style={{
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: 'green',
                      }}
                      alt="ini gambara"
                      role="img"
                    />
                    <Text
                      style={{
                        color: 'yellow',
                        fontWeight: 'bold',
                        fontSize: 24,
                        lineHeight: 24,
                      }}>
                      {avatar.price === 0 || avatar.owned === true
                        ? 'Free'
                        : avatar.price}{' '}
                      💎
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={10}>
              <Button
                style={{backgroundColor: 'red'}}
                onPress={() => setIsAvatar(false)}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                onPress={() => {
                  updateDataUser();
                  setIsAvatar(false);
                }}
                style={{backgroundColor: 'blue'}}>
                <ButtonText>Save</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {/* )} */}
    </Bg2>
  );
};

export default Home;
