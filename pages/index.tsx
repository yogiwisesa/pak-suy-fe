import { Box, Text } from '@chakra-ui/core';
import useSWR from 'swr';

type Note = {
  from: string;
  body: string;
};

type NoteRoot = {
  groupName: string;
  groupId: number;
  date: string;
  notes: Note[];
};

const Hello: React.FC = () => {
  const { data: notes } = useSWR<NoteRoot[]>('/note/-424092170/');

  return (
    <Box>
      <Text>Chatbot Pak Suy</Text>
    </Box>
  );
};

export default Hello;
