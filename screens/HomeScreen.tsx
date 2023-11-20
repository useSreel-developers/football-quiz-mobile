import {Box, Text, Button, ButtonText, Image} from '@gluestack-ui/themed';
import {TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Bg2 from '../components/Bg2';
import {useLogin} from '../hooks/useLogin';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {API} from '../utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/useUser';

const Home = ({navigation}: any) => {
  const user = useSelector((state: RootState) => state.user);
  const [isDiamond, setIsDiamond] = React.useState(false);
  const [isAvatar, setIsAvatar] = React.useState(false);
  const {onGoogleLogoutPress} = useLogin();
  // const {dataAvatar} = useUser();
  const [dataAvatar, setDataAvatar] = useState<any>(null);

  const getUserData = async () => {
    try {
      const response = await API.get('/check', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataAvatar = async () => {
    const response = await API.get('/avatars', {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });
    setDataAvatar(response.data.data);
  };

  useEffect(() => {
    getUserData();
    getDataAvatar();
  });
  return (
    <Bg2>
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
              💎 {user.user?.diamond}
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
        <Box
          style={{
            flex: 1,
            marginTop: 10,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Box style-={{postition: 'relative'}}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais',
              }}
              style={{borderRadius: 50, borderWidth: 2, borderColor: 'green'}}
              alt="ini gambara"
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 0, right: 0}}
              onPress={() => setIsAvatar(!isAvatar)}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>🖍</Text>
            </TouchableOpacity>
          </Box>
          <Button mb={50} onPress={() => navigation.navigate('Quiz')}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              Start Game
            </Text>
          </Button>
          <Button
            onPress={() =>
              onGoogleLogoutPress().then(() => navigation.navigate('Login'))
            }>
            <ButtonText>Logout</ButtonText>
          </Button>
        </Box>

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
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      borderWidth: 2,
                      borderColor: 'green',
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#e5c900',
                    }}>
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
                      {avatar.price === 0 ? 'Free' : avatar.price} 💎
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
              <Button style={{backgroundColor: 'blue'}}>
                <ButtonText>Save</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Bg2>
  );
};

export default Home;
