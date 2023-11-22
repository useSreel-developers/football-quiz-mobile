import {
  Box,
  Text,
  Button,
  ButtonText,
  Image,
  CheckCircleIcon,
  Alert,
  AlertIcon,
  VStack,
  AlertText,
  HStack,
  Spinner,
} from '@gluestack-ui/themed';
import {TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Bg2 from '../components/Bg2';
import {useLogin} from '../hooks/useLogin';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/useUser';
import {Icon} from 'react-native-elements';
import {useQuery} from '@tanstack/react-query';

const Home = ({navigation}: any) => {
  const loginnedUser = useSelector((state: RootState) => state.user);

  const [isDiamond, setIsDiamond] = React.useState(false);
  const [isAvatar, setIsAvatar] = React.useState(false);
  const {onGoogleLogoutPress} = useLogin();
  // const {dataAvatar} = useUser();
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataAvatar, setDataAvatar] = useState<any>(null);
  const [avatarId, setAvatarId] = useState<any>(null);
  const [avatarPrice, setAvatarPrice] = useState<any>(null);

  // const urlAvatarUser = loginnedUser?.user?.avatar?.avatar_url;

  // const getUserData = async () => {
  //   try {
  //     const response = await API.get('/check', {
  //       headers: {
  //         Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
  //       },
  //     });
  //     setDataUser(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  console.log(user);

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

  const handleGetAvatarId = async () => {
    try {
      const body = {
        name: dataUser.name,
        avatar: avatarId,
        // diamond: dataUser.diamond - avatarPrice,
      };
      await API.put('/update-profile', body, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getUserData();
    getDataAvatar();
  }, []);

  return (
    <Bg2>
      {loginnedUser.user === null ? (
        <HStack space="sm">
          <Spinner />
          <Text size="md">Please Wait</Text>
        </HStack>
      ) : (
        <Box
          style={{
            marginTop: 25,
            flex: 1,
            marginHorizontal: 10,
            position: 'relative',
          }}>
          <Box style={{display: 'flex', alignItems: 'flex-end'}}>
            <Box
              style={{
                backgroundColor: '#869f00',
                padding: 5,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                💎 {dataUser?.diamond}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'yellow',
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
                onPress={() => setIsDiamond(!isDiamond)}>
                <Text
                  style={{color: 'green', fontWeight: 'bold', fontSize: 20}}>
                  +
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <Box
            style={{
              flex: 1,
              marginTop: 90,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box style-={{postition: 'relative'}}>
              <TouchableOpacity
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setIsAvatar(!isAvatar)}>
                <Image
                  source={{uri: 'hehe.jpg'}}
                  style={{
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: 'green',
                  }}
                  alt={dataUser?.avatar?.avatar_name}
                  role="img"
                />
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
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                {dataUser?.name}
              </Text>
            </Box>
            <Button
              mb={50}
              mt={350}
              onPress={() => navigation.navigate('FindOpponent')}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
                Start Game
              </Text>
            </Button>
          </Box>
          <Button
            onPress={() =>
              onGoogleLogoutPress().then(() => navigation.navigate('Login'))
            }>
            <ButtonText>Logout</ButtonText>
          </Button>

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

          {/* {isAvatar && (
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
              {dataAvatar.map((avatar: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setAvatarId(avatar.id);
                      setAvatarPrice(avatar.price);
                    }}
                    style={
                      avatar.id === avatarId
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
                      alt={avatar.avatar_name}
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
                  handleGetAvatarId();
                  setIsAvatar(false);
                }}
                style={{backgroundColor: 'blue'}}>
                <ButtonText>Save</ButtonText>
              </Button>
            </Box>
          </Box>
        )} */}

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
                    handleGetAvatarId();
                    setIsAvatar(false);
                  }}
                  style={{backgroundColor: 'blue'}}>
                  <ButtonText>Save</ButtonText>
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Bg2>
  );
};

export default Home;
