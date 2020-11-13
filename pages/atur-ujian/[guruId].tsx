import { Box, Button, Flex, IconButton, Select, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import useSWR from 'swr';

import { Heading2 } from '../../components/Heading';
import { TextLarge } from '../../components/Text';
import axios from '../../lib/axios';
import { ExamRoot, Group } from '../../types';

const AturUjian: React.FC = () => {
  const router = useRouter();
  const { guruId } = router.query;

  const { data } = useSWR<Group[]>(`/teacher-class/${guruId}/`);
  const [selectedGroup, setGroup] = useState('');

  const { data: dataExam, revalidate } = useSWR<ExamRoot[]>(`/exam/${selectedGroup}/`);

  return (
    <Box padding="1rem">
      <Flex justify="space-between" marginBottom="0.75rem">
        <Heading2>Kelola Ujian</Heading2>
      </Flex>
      <Select
        mb="1rem"
        placeholder="Pilih kelas..."
        onChange={(e) => {
          const { value } = e.target;
          setGroup(value);
        }}>
        {data?.map((group) => (
          <option key={group.groupId} value={group.groupId}>
            {group.groupName}
          </option>
        ))}
      </Select>
      {dataExam?.map((exam) => (
        <Box
          padding="0.75rem"
          border="solid 1px #E2E8F0"
          borderRadius="0.25rem"
          marginBottom="0.75rem"
          key={exam.id}>
          <TextLarge marginBottom="0.25rem" fontWeight="bold">
            {exam.title}
          </TextLarge>

          <IconButton
            tabIndex={-1}
            variantColor="btnTomato"
            aria-label="delete"
            icon={RiDeleteBinLine}
            marginRight="0.25rem"
            onClick={() => {
              axios.delete(`/exam/${exam.id}`).finally(() => revalidate());
            }}
          />

          <IconButton
            tabIndex={-1}
            variantColor="btnLizard"
            aria-label="edit"
            onClick={() => router.push(`/form-ujian/${guruId}/${exam.id}`)}
            icon={RiEdit2Line}
            marginRight="0.25rem"
          />

          <Button variantColor="btnKata">Mulai Ujian</Button>
        </Box>
      ))}

      <Button onClick={() => router.push(`/form-ujian/${guruId}/0`)} variantColor="btnKata">
        Tambah Ujian
      </Button>
    </Box>
  );
};

export default AturUjian;
