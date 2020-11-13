import { Box, Select } from '@chakra-ui/core';
import dayjs from 'dayjs';
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
      <Select placeholder="Select option">
        {notes.map((note) => (
          <option key={note.date} value="option1">
            {dayjs(note.date).format('MMMM dd')}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default Hello;
