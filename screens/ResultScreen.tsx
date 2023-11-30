import {View, Text, Image, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import WinnerBg from '../components/WinnerBg';
import {useRoute} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons//FontAwesome6';
import {socketConnectionAtom} from '../globals/GlobalData';
import {useAtom} from 'jotai';
import {TypeWinner} from '../Type/TypeWinner';

const ResultScreen = ({navigation}: any) => {
  const route: any = useRoute();
  const points: any = route?.params?.points;
  const [socketConnection] = useAtom(socketConnectionAtom);
  const [dataWinner, setDataWinner] = useState<TypeWinner[]>([]);

  useEffect(() => {
    socketConnection.on('matchOver', res => {
      setDataWinner(res.finalScore);
    });
  }, []);

  const sortingWinnerScore = dataWinner.sort((a, b) => b.score - a.score);
  console.log('winner: ', sortingWinnerScore);

  return (
    <WinnerBg>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          marginTop: 110,
          position: 'relative',
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            color: '#468500',
            fontSize: 12,
            fontWeight: '900',
            backgroundColor: '#ffb703',
            padding: 5,
            borderRadius: 5,
            borderColor: '#468500',
          }}>
          CONGRATULATIONS, 1 💎 FOR {sortingWinnerScore[0].userName}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: 60,
          }}>
          {/*AVATAR JUARA 1*/}
          <Image
            source={{
              uri: sortingWinnerScore[0].userAvatar
                ? sortingWinnerScore[0].userAvatar
                : 'https://img.freepik.com/free-vector/happy-boy-character_1308-27606.jpg?size=626&ext=jpg&ga=GA1.1.1818359700.1701086645&semt=ais',
            }}
            style={{
              width: 70,
              height: 70,
              backgroundColor: 'red',
              borderRadius: 50,
              borderColor: '#ffb703',
              borderWidth: 2,
            }}
          />

          <Text style={{color: 'white', fontWeight: '900', fontSize: 10}}>
            {sortingWinnerScore[0].userName}
          </Text>
          <Text style={{color: '#468500', fontWeight: '900', fontSize: 20}}>
            {sortingWinnerScore[0].score}
          </Text>
          <FontAwesome6
            name="crown"
            size={30}
            color="#ffb703"
            style={{
              fontSize: 30,
              position: 'absolute',
              top: -25,
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            top: 90,
          }}>
          {/*AVATAR JUARA 2*/}
          <Image
            source={{
              uri: sortingWinnerScore[1].userAvatar
                ? sortingWinnerScore[1].userAvatar
                : 'https://img.freepik.com/free-vector/happy-boy-character_1308-27606.jpg?size=626&ext=jpg&ga=GA1.1.1818359700.1701086645&semt=ais',
            }}
            style={{
              width: 70,
              height: 70,
              backgroundColor: '#ffb703',
              borderRadius: 50,
              borderColor: '#ffb703',
              borderWidth: 2,
            }}
          />
          <Text style={{color: 'white', fontWeight: '900', fontSize: 10}}>
            {sortingWinnerScore[1].userName}
          </Text>
          <Text style={{color: '#468500', fontWeight: '900', fontSize: 20}}>
            {sortingWinnerScore[1].score}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            top: 120,
          }}>
          {/*AVATAR JUARA 3*/}
          <Image
            source={{
              uri: sortingWinnerScore[2].userAvatar
                ? sortingWinnerScore[2].userAvatar
                : 'https://img.freepik.com/free-vector/happy-boy-character_1308-27606.jpg?size=626&ext=jpg&ga=GA1.1.1818359700.1701086645&semt=ais',
            }}
            style={{
              width: 70,
              height: 70,
              backgroundColor: '#ffb703',
              borderRadius: 50,
              borderColor: '#ffb703',
              borderWidth: 2,
            }}
          />
          <Text style={{color: 'white', fontWeight: '900', fontSize: 10}}>
            {sortingWinnerScore[2].userName}
          </Text>
          <Text style={{color: '#468500', fontWeight: '900', fontSize: 20}}>
            {sortingWinnerScore[2].score}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 140,
            backgroundColor: '#468500',
            width: '100%',
            padding: 7,
            // borderRadius: 15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              backgroundColor: '#ffb703',
              // borderRadius: 10,
              marginBottom: 10,
              padding: 5,
            }}>
            <Image
              source={{
                uri: sortingWinnerScore[3].userAvatar
                  ? sortingWinnerScore[3].userAvatar
                  : 'https://img.freepik.com/free-vector/happy-boy-character_1308-27606.jpg?size=626&ext=jpg&ga=GA1.1.1818359700.1701086645&semt=ais',
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#ffb703',
                borderRadius: 50,
                borderColor: '#468500',
                borderWidth: 2,
              }}
            />
            <Text style={{color: '#468500', fontWeight: '900', fontSize: 12}}>
              {sortingWinnerScore[3].userName}
            </Text>
            <Text
              style={{
                color: '#468500',
                fontWeight: '900',
                fontSize: 20,
                marginLeft: 'auto',
              }}>
              {sortingWinnerScore[3].score}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              backgroundColor: '#ffb703',
              // borderRadius: 10,
              padding: 5,
            }}>
            <Image
              source={{
                uri: sortingWinnerScore[4].userAvatar
                  ? sortingWinnerScore[4].userAvatar
                  : 'https://img.freepik.com/free-vector/happy-boy-character_1308-27606.jpg?size=626&ext=jpg&ga=GA1.1.1818359700.1701086645&semt=ais',
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#468500',
                borderRadius: 50,
                borderColor: '#468500',
                borderWidth: 2,
              }}
            />
            <Text style={{color: '#468500', fontWeight: '900', fontSize: 12}}>
              {sortingWinnerScore[4].userName}
            </Text>
            <Text
              style={{
                color: '#468500',
                fontWeight: '900',
                fontSize: 20,
                marginLeft: 'auto',
              }}>
              {sortingWinnerScore[4].score}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            position: 'absolute',
            bottom: 10,
            justifyContent: 'space-around',
          }}>
          <Button
            title="RETURN TO HOME"
            onPress={() => navigation.navigate('Home')}
            color="red"
          />
          <Button
            title="PLAY AGAIN"
            onPress={() => navigation.navigate('FindOpponent')}
            color={'blue'}
          />
        </View>
      </View>
    </WinnerBg>
  );
};

export default ResultScreen;
