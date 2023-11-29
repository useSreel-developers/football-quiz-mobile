import {Text, View} from '@gluestack-ui/themed';
import {COLORS} from '../../constants/theme';
import {useQuestion} from '../../hooks/useQuestion';

export const renderQuestion = () => {
  const {currentQuestionIndex, allQuestion} = useQuestion();
  return (
    <View marginVertical={20}>
      {/* Question */}
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          lineHeight: 30,
        }}>
        {allQuestion[currentQuestionIndex]?.question}
      </Text>
    </View>
  );
};
