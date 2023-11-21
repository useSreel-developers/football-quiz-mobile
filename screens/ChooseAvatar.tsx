import {
  Box,
  Button,
  Image,
  Input,
  InputField,
  ButtonText,
  Text,
  Pressable,
} from '@gluestack-ui/themed';
import Bg1 from '../components/Bg1';
import {useAvatar} from '../hooks/useAvatar';

const ChooseAvatar = ({navigation}: any) => {
  const {avatar, user, avatarId, setAvatarId, updateDataUser} = useAvatar();

  return (
    <Bg1>
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <Box mt={30}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Choose Your Avatar
          </Text>
        </Box>

        {/* Avatar */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap">
          {avatar?.map(item => {
            if (item.price === 0) {
              return (
                <Pressable key={item.id} onPress={() => setAvatarId(item.id)}>
                  <Box
                    position="relative"
                    w={100}
                    h={100}
                    borderRadius={50}
                    m={15}
                    overflow="hidden">
                    <Image
                      source={item.avatar_url}
                      style={
                        item.id === avatarId
                          ? {
                              width: '100%',
                              height: '100%',
                              borderColor: 'white',
                              borderWidth: 5,
                              padding: 10,
                              borderRadius: 150,
                            }
                          : {
                              width: '100%',
                              height: '100%',
                              borderWidth: 2,
                              borderColor: 'green',
                            }
                      }
                      role="img"
                      alt={item.avatar_name}
                    />
                  </Box>
                </Pressable>
              );
            }
          })}
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
              value={user?.user?.name}
              placeholder="Your Name"
              // onChange={handleChangeInputUsername}
              type="text"
              style={{color: 'black'}}
            />
          </Input>
          {avatarId === null ? (
            <Button style={{backgroundColor: 'grey'}} disabled>
              <ButtonText>Continue</ButtonText>
            </Button>
          ) : (
            <Button
              onPress={() =>
                updateDataUser().then(() => navigation.navigate('Home'))
              }>
              <ButtonText>Continue</ButtonText>
            </Button>
          )}
        </Box>
        {/* End Input Username */}
      </Box>
    </Bg1>
  );
};

export default ChooseAvatar;
