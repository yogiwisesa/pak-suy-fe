import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  useToast
} from '@chakra-ui/core';
import { Field, FieldArray, Formik } from 'formik';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import axios from '../../../lib/axios';
import { ExamRoot, Group } from '../../../types';

// https://formik.org/docs/api/fieldarray
const UjianSchema = yup.object().shape({
  title: yup.string().required('Judul ujian tidak boleh kosong'),
  duration: yup.number().required('Durasi ujian tidak boleh kosong'),
  groupId: yup.number().required('Kelas tidak boleh kosong'),
  problems: yup.array().of(
    yup.object().shape({
      problem: yup.string().required('Soal tidak boleh kosong'),
      correctAnswer: yup.string().required('Jawaban yang benar harus dipilih'),
      answers: yup.array().of(yup.string().required('Pilihan jawaban tidak boleh kosong'))
    })
  )
});

const AturUjian: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { guruId, examId } = router.query;
  const { data } = useSWR<Group[]>(`/teacher-class/${guruId}/`);
  const { data: dataExam } = useSWR<ExamRoot>(`/exam/detail/${examId}/`);

  return (
    <Box padding="1rem">
      <Formik
        initialValues={
          examId && dataExam
            ? dataExam
            : {
                title: '',
                duration: '',
                groupId: null,
                id: uuidv4(),
                problems: [{ problem: '', answers: [''], correctAnswer: '' }]
              }
        }
        validationSchema={UjianSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          const body = {
            ...values,
            groupId: parseInt(values.groupId, 10)
          };

          axios
            .post('/exam', body)
            .then((res) => router.push(`/atur-ujian/${guruId}`))
            .catch((err) => {
              console.log(err);
              toast(err.message);
            });
        }}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="title">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.title && form.touched.title} mb="14px">
                  <FormLabel htmlFor="title">Judul Ujian</FormLabel>
                  <Input {...field} type="title" id="title" placeholder="Teori atom dalton..." />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="duration">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.duration && form.touched.duration} mb="14px">
                  <FormLabel htmlFor="duration">Durasi Ujian (Menit)</FormLabel>
                  <Input {...field} type="duration" id="duration" placeholder="60" />
                  <FormErrorMessage>{form.errors.duration}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="groupId">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.groupId && form.touched.groupId} mb="14px">
                  <FormLabel htmlFor="groupId">Kelas</FormLabel>
                  <Select {...field} mb="1rem" placeholder="Pilih kelas...">
                    {data?.map((group) => (
                      <option key={group.groupId} value={group.groupId}>
                        {group.groupName}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.groupId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <FieldArray
              name="problems"
              render={(arrayHelpers) => (
                <Box>
                  {props.values.problems &&
                    props.values.problems.map((prob, index) => (
                      <Box
                        key={index}
                        padding="0.75rem"
                        border="solid 1px #E2E8F0"
                        borderRadius="0.25rem"
                        marginBottom="0.75rem">
                        <Field name={`problems.[${index}].problem`}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                get(form, `errors.problems[${index}].problem`) &&
                                get(form, `touched.problems[${index}].problem`)
                              }
                              mb="14px">
                              <Flex justify="space-between" align="baseline" marginBottom="0.25rem">
                                <FormLabel htmlFor="problem">Soal {index + 1}</FormLabel>
                                <IconButton
                                  tabIndex={-1}
                                  variantColor="btnTomato"
                                  aria-label="delete"
                                  icon={RiDeleteBinLine}
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              </Flex>
                              <Input
                                {...field}
                                type={`problems.[${index}].problem`}
                                id={`problems.[${index}].problem`}
                                placeholder="Siapa nama penemu lampu?"
                              />
                              <FormErrorMessage>
                                {get(form, `errors.problems[${index}].problem`)}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <FieldArray
                          name={`problems[${index}].answers`}
                          render={(arrayHelpers) => (
                            <Box>
                              {props.values.problems[index].answers &&
                                props.values.problems[index].answers.map((prob, answerIndex) => (
                                  <Box
                                    key={index}
                                    padding="0.75rem"
                                    border="solid 1px #E2E8F0"
                                    borderRadius="0.25rem"
                                    marginBottom="0.5rem">
                                    <Field name={`problems.[${index}].answers.[${answerIndex}]`}>
                                      {({ field, form }) => (
                                        <FormControl
                                          isInvalid={
                                            get(
                                              form,
                                              `errors.problems[${index}].answers[${answerIndex}]`
                                            ) &&
                                            get(
                                              form,
                                              `touched.problems[${index}].answers[${answerIndex}]`
                                            )
                                          }
                                          mb="14px">
                                          <Flex
                                            justify="space-between"
                                            align="baseline"
                                            marginBottom="0.25rem">
                                            <FormLabel htmlFor="duration">
                                              Jawaban {answerIndex + 1}
                                            </FormLabel>
                                            <IconButton
                                              tabIndex={-1}
                                              variantColor="btnTomato"
                                              aria-label="delete"
                                              icon={RiDeleteBinLine}
                                              onClick={() => arrayHelpers.remove(answerIndex)}
                                            />
                                          </Flex>

                                          <Input
                                            {...field}
                                            type={`problems.[${index}].answers.[${answerIndex}]`}
                                            id={`problems.[${index}].answers.[${answerIndex}]`}
                                            placeholder="Thomas Alva Edison"
                                          />
                                          <FormErrorMessage>
                                            {get(
                                              form,
                                              `errors.problems[${index}].answers[${answerIndex}]`
                                            )}
                                          </FormErrorMessage>
                                        </FormControl>
                                      )}
                                    </Field>
                                  </Box>
                                ))}

                              <Button
                                leftIcon={RiAddLine}
                                marginTop="0.75rem"
                                marginBottom="0.75rem"
                                tabIndex={-1}
                                onClick={() =>
                                  arrayHelpers.insert(
                                    props.values.problems[index].answers.length,
                                    ''
                                  )
                                }
                                variantColor="btnLizard"
                                isLoading={props.isSubmitting}>
                                Tambah Jawaban
                              </Button>
                            </Box>
                          )}
                        />

                        <Field name={`problems[${index}].correctAnswer`}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                get(form, `errors.problems[${index}].correctAnswer`) &&
                                get(form, `touched.problems[${index}].correctAnswer`)
                              }
                              mb="14px">
                              <FormLabel htmlFor={`correctanswer`}>Jawaban Benar</FormLabel>
                              <Select {...field} mb="1rem" placeholder="Pilih jawaban benar...">
                                {props.values.problems[index].answers?.map((answer) => (
                                  <option key={answer} value={answer}>
                                    {answer}
                                  </option>
                                ))}
                              </Select>
                              <FormErrorMessage>
                                {get(form, `errors.problems[${index}].correctAnswer`)}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.insert(props.values.problems.length, {
                        problem: '',
                        answers: [''],
                        correctAnswer: ''
                      })
                    }
                    mt={4}
                    tabIndex={-1}
                    variantColor="btnLizard"
                    isLoading={props.isSubmitting}>
                    Tambah Soal
                  </Button>
                </Box>
              )}
            />

            <Divider />
            <Button mt={4} variantColor="btnKata" isLoading={props.isSubmitting} type="submit">
              Buat Ujian
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AturUjian;
