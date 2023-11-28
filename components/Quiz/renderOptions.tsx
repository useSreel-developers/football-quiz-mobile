import {View, Text} from '@gluestack-ui/themed';
import {useQuestion} from '../../hooks/useQuestion';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/theme';

export const renderOptions = () => {
  const {
    allQuestion,
    currentQuestionIndex,
    counter,
    correctOption,
    currentOptionSelected,
    validateAnswer,
  } = useQuestion();
  return (
    <View>
      {allQuestion[currentQuestionIndex]?.options.map((option: any) => {
        if (counter <= 0) {
          return (
            <TouchableOpacity
              disabled={true}
              key={option}
              style={{
                borderWidth: 3,
                borderColor:
                  option == correctOption
                    ? COLORS.success
                    : option == currentOptionSelected
                    ? COLORS.error
                    : COLORS.secondary + '40',
                backgroundColor:
                  option == correctOption
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
              <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

              {/* Show Check or Cross Icon based on correct answer */}
              {option == correctOption ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: COLORS.success,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <MaterialCommunityIcons
                  name="check"
                  style={{color: COLORS.white, fontSize: 20}}
                /> */}
                </View>
              ) : option == currentOptionSelected ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: COLORS.error,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <MaterialCommunityIcons
                  name="close"
                  style={{color: COLORS.white, fontSize: 20}}
                /> */}
                </View>
              ) : null}
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={false}
              key={option}
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
              <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};
