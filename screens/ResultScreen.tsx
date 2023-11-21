import {Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {useRoute} from '@react-navigation/native';
// import { AntDesign } from "@expo/vector-icons";

const ResultScreen = ({navigation}: any) => {
  const route: any = useRoute();
  const points: any = route?.params?.points;

  return (
    <SafeAreaView style={{margin: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>Your Result</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 14,
          }}>
          <Text>Share</Text>
          {/* <AntDesign
            style={{ marginLeft: 4 }}
            name="sharealt"
            size={18}
            color="black"
          /> */}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <Text>Question Answered</Text>
        <Text>(5/5)</Text>
      </View>

      <Pressable
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          borderRadius: 7,
          height: 200,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Text
          style={{
            fontSize: 20,
            color: 'magenta',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Score Card
        </Text>
        <Text
          style={{
            fontSize: 40,
            color: 'magenta',
            textAlign: 'center',
            marginTop: 50,
          }}>
          {points}
        </Text>
      </Pressable>

      <Pressable
        style={{
          alignItems: 'center',
          marginTop: 50,
          height: 50,
          backgroundColor: 'magenta',
          margin: 60,
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Text
          style={{
            color: 'white',
            // marginTop: 15,
            fontSize: 20,
          }}>
          Play Again
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({});
