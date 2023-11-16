import {
  Box,
  Button,
  Image,
  Input,
  InputField,
  ButtonText,
  Text,
} from '@gluestack-ui/themed';
import {RootState} from '../redux/store';
import React, {useEffect, useState} from 'react';
import Bg1 from '../components/Bg1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const ChooseAvatar = ({navigation}: any) => {
  const {user: userLogin} = useSelector((state: RootState) => state.user);

  const [userName, setUserName] = useState<string>();
  useEffect(() => {
    const getData = async () => {
      const username: any = await AsyncStorage.getItem('user');
      setUserName(username);
      console.log(username);
    };
    getData();
  }, []);

  return (
    <Bg1>
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <Box mt={30}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Choose Your Avatar
          </Text>
        </Box>

        {/* Avatar */}
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          <Box
            position="relative"
            w={70}
            h={70}
            borderRadius={50}
            overflow="hidden"
            m={10}>
            <Image
              source="https://img.freepik.com/free-vector/it-takes-two-tango-idiom_1308-17930.jpg?size=626&ext=jpg&ga=GA1.1.237627799.1696464947&semt=ais"
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 2,
                borderColor: 'green',
              }}
              role="img"
              alt="ini gambara"
            />
            <Button
              onPress={() => alert('Belum ada avatar asli')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99,
                height: 70,
                backgroundColor: 'transparent',
              }}
            />
          </Box>
        </Box>
        {/* End Avatar */}

        {/* Input Username */}
        <Box>
          <Input
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={{backgroundColor: 'white'}}
            w={'$4/5'}
            my={10}>
            <InputField
              value={userLogin.email}
              //   placeholder="Your Name"
              type="text"
              style={{color: 'black'}}
            />
          </Input>
          <Button onPress={() => navigation.navigate('Home')}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </Box>
        {/* End Input Username */}
      </Box>
    </Bg1>
  );
};

export default ChooseAvatar;
