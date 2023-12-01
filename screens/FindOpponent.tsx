import React, {useState, useEffect} from 'react';
import {Box, Text, ButtonText, Image, Button} from '@gluestack-ui/themed';
import {View, Alert} from 'react-native';
import {socketConnectionAtom} from '../globals/GlobalData';
import {useAtom} from 'jotai';
import {HStack} from '@gluestack-ui/themed';
import {Spinner} from '@gluestack-ui/themed';
import AppLottieView from '../components/AppLottieView';
import Bg1 from './../components/Bg1';
import {roomId, questions} from '../globals/GlobalData';

const FindOpponent = ({navigation}: any) => {
  const [time, setTime] = useState<any>();
  const [dataPlayer, setDataPlayer] = useState<any>([]);
  const [socketConnection] = useAtom(socketConnectionAtom);
  const [roomIdQuiz, setRoomIdQuiz] = useAtom(roomId);
  const [dataQuestion, setDataQuestion] = useAtom(questions);

  useEffect(() => {
    socketConnection.on('findingMatch', (res: any) => {
      setDataPlayer(res.members);
    });

    socketConnection.on('findingMatchCountdown', (res: any) => {
      setTime(res.countdownTime);
    });

    socketConnection.on('matchFound', res => {
      setRoomIdQuiz(res.roomId);
      setDataQuestion(res.questions);
      navigation.navigate('Quiz');
      // console.log(res);
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
          {dataPlayer.length === 5 ? (
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
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 72,
                  lineHeight: 85,
                  color: '#ffb703',
                  backgroundColor: 'green',
                  borderRadius: 10,
                  borderColor: '#ffb703',
                  borderWidth: 2,
                  paddingHorizontal: 5,
                }}>
                00
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 72,
                  lineHeight: 85,
                  color: 'green',
                }}>
                {''}:{''}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 72,
                  lineHeight: 85,
                  color: '#ffb703',
                  backgroundColor: 'green',
                  borderRadius: 10,
                  borderColor: '#ffb703',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}>
                {!time ? '00' : time < 10 ? `0${time}` : time}
              </Text>
            </View>
          )}
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              lineHeight: 38,
              fontWeight: 'bold',
            }}>
            {time % 10 === 0
              ? 'Please Wait!'
              : time % 3 === 0
              ? 'Finding opponent.'
              : time % 2 === 0
              ? 'Finding opponent..'
              : time % 2 === 1
              ? 'Finding opponent...'
              : 'Please Wait!'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 35,
              lineHeight: 36,
              fontWeight: 'bold',
            }}>
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
                  backgroundColor: 'green',
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#ffb703',
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
                  style={{
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    borderColor: '#ffb703',
                    borderWidth: 2,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    lineHeight: 20,
                    fontWeight: 'bold',
                  }}>
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
              backgroundColor: '#ff3131',
              borderColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
            }}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </Box>
      </Box>
    </Bg1>
  );
};

export default FindOpponent;
