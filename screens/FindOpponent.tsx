import React, {useState, useEffect} from 'react';
import {Box, Text, ButtonText, Image, Button} from '@gluestack-ui/themed';
import {View} from 'react-native';
import {socketConnectionAtom} from '../globals/GlobalData';
import {useAtom} from 'jotai';
import {HStack} from '@gluestack-ui/themed';
import {Spinner} from '@gluestack-ui/themed';
import AppLottieView from '../components/AppLottieView';
import Bg1 from '../components/Bg1';

const FindOpponent = ({navigation}: any) => {
  const [time, setTime] = useState<any>();
  const [dataPlayer, setDataPlayer] = useState<any>([]);
  const [socketConnection] = useAtom(socketConnectionAtom);

  useEffect(() => {
    socketConnection.on('findingMatch', (res: any) => {
      setDataPlayer(res.members);
    });

    socketConnection.on('findingMatchCountdown', (res: any) => {
      setTime(res.countdownTime);
    });

    socketConnection.on('matchFound', res => {
      navigation.navigate('Quiz');
    });

    return () => {
      socketConnection.off('findingMatch');
      socketConnection.off('findingMatchCountdown');
      socketConnection.off('matchFound');
    };
  }, []);

  const handleCancelMatchmaking = () => {
    socketConnection.emit('cancelMatchmaking', navigation.replace('Home'));
  };

  return (
    <Bg1>
      <Box style={{marginTop: 25, flex: 1, marginHorizontal: 10}}>
        <Box
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {dataPlayer.length === 3 ? (
            // <View>
            //    <ActivityIndicator color="#36d7b7" />
            //    <HStack space="sm">
            //     <Spinner />
            //     <Text size="md">Please Wait</Text>
            //   </HStack>
            //  </View>
            <View>
              <AppLottieView
                source={require('../assets/animation/AnimationLoading.json')}
                autoPlay
                loop
                speed={1.5}
                style={{width: 70, height: 70}}
              />
            </View>
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 72,
                lineHeight: 80,
                color: 'yellow',
              }}>
              00:{time < 10 ? `0${time}` : time}
            </Text>
          )}
          <Text style={{color: 'white', fontSize: 35, lineHeight: 38}}>
            Finding oponent
          </Text>
          <Text style={{color: 'white', fontSize: 35, lineHeight: 36}}>
            {dataPlayer.length}/5
          </Text>
          {dataPlayer.map((player: any, index: any) => {
            return (
              <Box
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: 'blue',
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                  gap: 10,
                  padding: 5,
                  marginBottom: 5,
                }}>
                <Image
                  source={{
                    uri: player.userAvatar
                      ? player.userAvatar
                      : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1700712782~exp=1700713382~hmac=05bdd42caf7eadaf1c00c10029f54806c78874461728bc38046315f09e795a16',
                  }}
                  alt="avatar"
                  style={{borderRadius: 50, width: 50, height: 50}}
                />
                <Text style={{color: 'white', fontSize: 25, lineHeight: 25}}>
                  {player.userName}
                </Text>
              </Box>
            );
          })}

          <Button
            onPress={handleCancelMatchmaking}
            style={{
              position: 'absolute',
              bottom: 10,
              backgroundColor: 'red',
              borderRadius: 10,
            }}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </Box>
      </Box>
    </Bg1>
  );
};

export default FindOpponent;
