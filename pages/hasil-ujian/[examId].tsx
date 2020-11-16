import { Box, useToast } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

import { Heading2, Heading3, Heading4 } from '../../components/Heading';
import { TextMedium } from '../../components/Text';
import { ExamAnswer } from '../../types';
import AnswerBox from './components/AnswerBox';

const HasilUjian: React.FC = () => {
  const router = useRouter();
  const { examId } = router.query;

  const { data } = useSWR<ExamAnswer[]>(`/exam/result/${examId}/`);

  return (
    <Box padding="1rem">
      <Heading2 marginBottom="0.75rem">Hasil Ujian</Heading2>
      {data && Boolean(data.length) && <Heading4 marginBottom="0.75rem">{data[0].title}</Heading4>}
      {data && !data.length && (
        <Heading3 marginBottom="0.75rem">Tidak ada jawaban ditemukan!</Heading3>
      )}
      {data?.map((exam) => (
        <Box
          key={exam.studentId}
          padding="0.75rem"
          border="solid 1px #E2E8F0"
          borderRadius="0.25rem"
          marginBottom="0.75rem">
          <TextMedium fontWeight="bold">{exam.studentName}</TextMedium>
          <TextMedium>Dijawab Benar: {exam.correctAnswerCount}</TextMedium>
          <AnswerBox problems={exam.problems} />
        </Box>
      ))}
    </Box>
  );
};

export default HasilUjian;
