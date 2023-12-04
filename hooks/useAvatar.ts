import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../utlis/api';
import {login} from '../redux/sliceUser';

export const useAvatar = () => {
  const [avatar, setAvatar] = useState<TypeAvatar[] | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [avatarId, setAvatarId] = useState<number | null>(null);
  const [diamondId, setDiamondId] = useState<number | null>(null);
  // const [updateUsername, setUpdateUsername] = useState<string | null>(null);

  const updateDataUser = async () => {
    try {
      const body = {
        name: user.user?.name,
        avatar: avatarId,
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
    const getData = async () => {
      try {
        const response = await API.get('/check', {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        });
        dispatch(login(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    const getAvatar = async () => {
      try {
        const response = await API.get('/avatars', {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        });
        setAvatar(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // const handleChangeInputUsername = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    //   e.target.value
    // }

    getData();
    getAvatar();
    updateDataUser();
  }, []);

  return {avatar, user, avatarId, setAvatarId, updateDataUser, diamondId, setDiamondId};
};
