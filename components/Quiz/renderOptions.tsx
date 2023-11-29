import {View, Text} from '@gluestack-ui/themed';
import {useQuestion} from '../../hooks/useQuestion';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/theme';
import {useAtom} from 'jotai';
import {temporaryAnswer} from '../../globals/GlobalData';
import {Image} from '@gluestack-ui/themed';

export const renderOptions = () => {
  const {
    allQuestion,
    dataQuestion,
    currentQuestionIndex,
    counter,
    correctOption,
    currentOptionSelected,
    validateAnswer,
  } = useQuestion();
  const [temporaryAnswerUser, setTemporaryAnswerUser] =
    useAtom(temporaryAnswer);

  let optionToIndex;
  // const handleAvatarOptionAnswer = () => {

  // }

  return (
    <View style={{width: '100%'}}>
      {dataQuestion[currentQuestionIndex]?.options.map(
        (option: any, index: number) => {
          if (counter <= 0) {
            return (
              <TouchableOpacity
                disabled={true}
                key={index}
                style={{
                  borderWidth: 3,
                  borderColor:
                    option == correctOption
                      ? COLORS.success
                      : option == currentOptionSelected
                      ? COLORS.error
                      : COLORS.secondary + '40',
                  backgroundColor:
                    option.asnwer == correctOption
                      ? COLORS.success + '20'
                      : option == currentOptionSelected
                      ? COLORS.error + '20'
                      : COLORS.secondary + '40',
                  height: 60,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 20, color: COLORS.white}}>
                  {option}
                </Text>

                {temporaryAnswerUser?.map((answer: any, key) => {
                  if (answer.option === 'A' && index === 0) {
                    return (
                      <View key={key}>
                        <Image
                          source={{
                            uri: answer.avatar
                              ? answer.avatar
                              : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1700712782~exp=1700713382~hmac=05bdd42caf7eadaf1c00c10029f54806c78874461728bc38046315f09e795a16',
                          }}
                          alt="Avatar User"
                          style={{width: 30, height: 30, borderRadius: 50}}
                        />
                      </View>
                    );
                  }
                  if (answer.option === 'B' && index === 1) {
                    return (
                      <View key={key}>
                        <Image
                          source={{
                            uri: answer.avatar
                              ? answer.avatar
                              : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1700712782~exp=1700713382~hmac=05bdd42caf7eadaf1c00c10029f54806c78874461728bc38046315f09e795a16',
                          }}
                          alt="Avatar User"
                          style={{width: 30, height: 30, borderRadius: 50}}
                        />
                      </View>
                    );
                  }
                  if (answer.option === 'C' && index === 2) {
                    return (
                      <View key={key}>
                        <Image
                          source={{
                            uri: answer.avatar
                              ? answer.avatar
                              : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1700712782~exp=1700713382~hmac=05bdd42caf7eadaf1c00c10029f54806c78874461728bc38046315f09e795a16',
                          }}
                          alt="Avatar User"
                          style={{width: 30, height: 30, borderRadius: 50}}
                        />
                      </View>
                    );
                  }
                  if (answer.option === 'D' && index === 3) {
                    return (
                      <View key={key}>
                        <Image
                          source={{
                            uri: answer.avatar
                              ? answer.avatar
                              : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1700712782~exp=1700713382~hmac=05bdd42caf7eadaf1c00c10029f54806c78874461728bc38046315f09e795a16',
                          }}
                          alt="Avatar User"
                          style={{width: 30, height: 30, borderRadius: 50}}
                        />
                      </View>
                    );
                  }
                })}
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => validateAnswer(option, index)}
                disabled={false}
                key={index}
                style={{
                  borderWidth: 3,
                  borderColor:
                    option == currentOptionSelected
                      ? COLORS.accent
                      : COLORS.secondary + '40',
                  backgroundColor: COLORS.secondary + '40',
                  height: 60,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 20, color: COLORS.white}}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          }
        },
      )}
    </View>
  );
};
