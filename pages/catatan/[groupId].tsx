import { Box, Divider, Flex, Select } from '@chakra-ui/core';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Heading2, Heading3 } from '../../components/Heading';
import { TextLarge, TextMedium } from '../../components/Text';
import { DATE_FORMAT_VIEW } from '../../helpers/constants';
import { urlify } from '../../helpers/url';
import { Note, NoteRoot } from '../../types';

const Catatan: React.FC = () => {
  const router = useRouter();
  const { data } = useSWR<NoteRoot[]>(`/note/${router.query.groupId}/`);
  const [selectedNote, setNote] = useState('');

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!data) return;

    const findNote = data.find((item) => item.date === selectedNote);
    if (!findNote) return;

    setNotes(findNote.notes);
  }, [selectedNote]);

  let lastFrom = '';
  return (
    <Box padding="1rem">
      <Flex justify="space-between" marginBottom="0.75rem">
        <Heading2>Catatan</Heading2>
        {data && <Heading3>{data[0]?.groupName}</Heading3>}
      </Flex>
      <Select
        mb="1rem"
        placeholder="Pilih catatan..."
        onChange={(e) => {
          const { value } = e.target;
          setNote(value);
        }}>
        {data?.map((note) => (
          <option key={note.date} value={note.date}>
            {dayjs(note.date).format(DATE_FORMAT_VIEW)}
          </option>
        ))}
      </Select>
      {notes.map((note) => {
        let isRender = false;

        if (lastFrom !== note.from) {
          lastFrom = note.from;
          isRender = true;
        }
        return (
          <Box key={note.body}>
            <>
              {isRender && (
                <>
                  <TextMedium fontWeight="bold">{note.from}</TextMedium>
                  <Divider />
                </>
              )}
              <TextLarge dangerouslySetInnerHTML={{ __html: urlify(note.body) }}></TextLarge>
            </>
          </Box>
        );
      })}

      {!notes.length && (
        <TextMedium fontWeight="bold" textAlign="center">
          Tidak ada catatan nih!
        </TextMedium>
      )}
    </Box>
  );
};

export default Catatan;
