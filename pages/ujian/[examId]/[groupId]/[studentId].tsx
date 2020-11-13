import { Box, Button, FormControl, FormErrorMessage, Radio, RadioGroup } from '@chakra-ui/core';
import { Field, FieldArray, Formik } from 'formik';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import * as yup from 'yup';

import { Heading2, Heading4 } from '../../../../components/Heading';
import { TextMedium } from '../../../../components/Text';
import { ExamAnswer, ExamRoot, MemberRoot } from '../../../../types';

const UjianSchema = yup.object().shape({
  title: yup.string().required('Judul ujian tidak boleh kosong'),
  duration: yup.number().required('Durasi ujian tidak boleh kosong'),
  groupId: yup.number().required('Kelas tidak boleh kosong'),
  problems: yup.array().of(
    yup.object().shape({
      problem: yup.string().required('Soal tidak boleh kosong'),
      correctAnswer: yup.string().required('Jawaban yang benar harus dipilih'),
      answers: yup.array().of(yup.string().required('Pilihan jawaban tidak boleh kosong')),
      answer: yup.string().required('Silahkan pilih jawaban yang menurutmu benar')
    })
  )
});

const Ujian: React.FC = () => {
  const router = useRouter();
  const { studentId, examId, groupId } = router.query;
  const { data: dataExam } = useSWR<ExamRoot>(`/exam/detail/${examId}/`);
  const { data: dataStudent } = useSWR<MemberRoot>(`/member/${groupId}/${studentId}`);

  return (
    <Box padding="1rem">
      <Heading2 mb="0.5rem">{`Ujian ${dataExam?.title}`}</Heading2>
      <Heading4 mb="0.5rem">{dataStudent?.group.groupName}</Heading4>
      <Heading4 mb="0.5rem">{dataStudent?.student.firstName}</Heading4>
      <Formik
        initialValues={{
          ...dataExam,
          problems: dataExam?.problems?.map((problem) => {
            return {
              ...problem,
              answer: ''
            };
          })
        }}
        validationSchema={UjianSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);

          const body: ExamAnswer = {
            
          }

          setTimeout(() => {
            alert(JSON.stringify(values));
            actions.setSubmitting(false);
          });
        }}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FieldArray
              name="problems"
              render={() => (
                <Box>
                  {props.values?.problems &&
                    props.values?.problems.map((prob, index) => (
                      <Box
                        key={prob.problem}
                        padding="0.75rem"
                        border="solid 1px #E2E8F0"
                        borderRadius="0.25rem"
                        marginBottom="0.75rem">
                        <TextMedium fontWeight="bold" marginBottom="0.5rem">
                          {prob.problem}
                        </TextMedium>

                        <Field name={`problems.[${index}].answer`}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                get(form, `errors.problems[${index}].answer`) &&
                                get(form, `touched.problems[${index}].answer`)
                              }
                              mb="14px">
                              <RadioGroup {...field}>
                                {prob.answers.map((answer) => (
                                  <Radio key={answer} value={answer}>
                                    <TextMedium>{answer}</TextMedium>
                                  </Radio>
                                ))}
                              </RadioGroup>
                              <FormErrorMessage>
                                {get(form, `errors.problems[${index}].answer`)}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    ))}
                  <Button variantColor="btnKata" type="submit">
                    Kumpul Ujian
                  </Button>
                </Box>
              )}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Ujian;
