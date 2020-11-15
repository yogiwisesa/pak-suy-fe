import { Box, Flex, Icon } from '@chakra-ui/core';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import { TextMedium } from '../../../components/Text';
import { ExamProblem } from '../../../types';

type Props = {
  problems: ExamProblem[];
};

const AnswerBox: React.FC<Props> = (props) => {
  const [isExpanded, setExpand] = useState(false);
  return (
    <Box>
      <Flex
        cursor="pointer"
        onClick={() => setExpand((prev) => !prev)}
        align="center"
        justify="space-between"
        fontSize="30px">
        <TextMedium>Lihat Jawaban Siswa</TextMedium>

        <Icon as={isExpanded ? BsChevronUp : BsChevronDown} />
      </Flex>
      {isExpanded &&
        props.problems.map((problem) => (
          <Box
            key={problem.problem}
            padding="0.75rem"
            border="solid 1px #E2E8F0"
            borderRadius="0.25rem"
            marginBottom="0.75rem">
            <TextMedium>Soal: {problem.problem}</TextMedium>
            <TextMedium marginBottom="0.5rem">Jawaban Siswa: {problem.answer}</TextMedium>
            {!problem.answers.length && <TextMedium>Soal ini adalah soal essay.</TextMedium>}
            {Boolean(problem.answers.length) && (
              <TextMedium>Jawaban Benar: {problem.answer}</TextMedium>
            )}

            {Boolean(problem.similars.length) && (
              <TextMedium fontWeight="bold" marginTop="1rem">
                Jawaban ini terindikasi plagiat!!!
              </TextMedium>
            )}
            {problem.similars.map((similar, index) => (
              <Box
                key={index}
                padding="0.75rem"
                border="solid 1px #E2E8F0"
                borderRadius="0.25rem"
                marginBottom="0.75rem">
                <TextMedium fontWeight="bold">{similar.student.studentName}</TextMedium>
                <TextMedium>
                  Jawaban: {similar.target} ({(similar.score * 100).toFixed(2)}%)
                </TextMedium>
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  );
};

export default AnswerBox;
