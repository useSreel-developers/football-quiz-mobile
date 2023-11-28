import {Text, View} from '@gluestack-ui/themed';
import {COLORS} from '../../constants/theme';
import {useQuestion} from '../../hooks/useQuestion';

export const renderQuestion = () => {
  const {currentQuestionIndex, allQuestion} = useQuestion();
  return (
    <View marginVertical={20}>
      {/* Question */}
      <Text style={{color: COLORS.white, fontSize: 20}}>
        {allQuestion[currentQuestionIndex]?.question}
      </Text>
    </View>
  );
};
