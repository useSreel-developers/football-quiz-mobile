import {Text, View} from '@gluestack-ui/themed';
import {COLORS} from '../../constants/theme';
import {useQuestion} from '../../hooks/useQuestion';
import {useAtom} from 'jotai';
import {questions} from '../../globals/GlobalData';

export const renderQuestion = () => {
  const {currentQuestionIndex, allQuestion} = useQuestion();
  const [dataQuestion, setDataQuestion] = useAtom(questions);
  return (
    <View marginVertical={20}>
      {/* Question */}
      <Text style={{color: COLORS.white, fontSize: 20}}>
        {dataQuestion[currentQuestionIndex]?.question}
      </Text>
    </View>
  );
};
