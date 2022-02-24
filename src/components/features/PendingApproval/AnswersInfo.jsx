import { Heading, Box, FormControl, Input, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AnswerImageInput from './AnswerImageInput';
import AnswerTextInput from './AnswerTextInput';

import { getAnswers, changeAnswer } from 'services/answers';
import { uploadFile } from 'services/uploadFile';

function AnswersInfo({ profileId }) {
  const [answers, setQuestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [questionAnswers, setQuestionsAnswers] = useState([]);
  console.log('q&&&&a.....', questionAnswers, questionAnswers.length);
  questionAnswers.forEach((ans) => console.log('bxbx ,aaa', ans));
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const [isAnyError, setIsAnyError] = useState(false);

  const getAsyncQuestions = async () => {
    const data = await getAnswers(profileId);
    console.log('sss', data);
    setQuestions(data.data);
  };

  useEffect(() => {
    getAsyncQuestions();
  }, [profileId]);

  useEffect(() => {
    const newQuestionAnswers = [];
    answers.map((answer) => {
      const question = answer?.attributes?.question?.data;
      newQuestionAnswers.push([answer?.attributes?.answer, question?.attributes?.type, answer?.id]);
    });
    setQuestionsAnswers(newQuestionAnswers);
  }, [answers]);

  const changeAsyncAnswer = async (answerId, answerText, answerType) => {
    if (answerType === 'image' && answerText != '') {
      const uploadFileData = new FormData();
      uploadFileData.append('files', answerText);
      console.log('photoo filee??????', answerText);
      const uploadResponse = await uploadFile(uploadFileData);
      answerText = uploadResponse[0].url;
    }
    if (!answerText) answerText = '';
    console.log('sta je answer texttT?T?T??', answerText);
    await changeAnswer(answerId, answerText);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    /*     await changeUsername(currentProfile?.id, nameInput, false);
    const uploadFileData = new FormData();
    uploadFileData.append('files', profilePhotoFile);

    await changeUserPhoto(uploadFileData, currentProfile?.id);
    console.log('profilna nije promenjena', profilePhoto);
 */

    questionAnswers.forEach((answerArr) => {
      console.log('loOOOOOOLlLloLoOL', answerArr);
      changeAsyncAnswer(answerArr[2], answerArr[0], answerArr[1]);
    });

    toast({
      description: 'Changes saved.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setIsEditing(false);
  };

  const setQuestionInput = (value, index) => {
    console.log('setQuestionInput: ', questionAnswers, index, value);
    questionAnswers[index][0] = value;
  };

  return (
    <Box w={{ base: '100%', smmd: '50%' }} maxW="700px" p="2rem">
      <Heading as="h3" size="md" mb="1rem">
        Answers:
      </Heading>
      <form onSubmit={handleEditProfile}>
        {answers.map((answer, index) => {
          const question = answer?.attributes?.question?.data;
          console.log('questt attrrrrr', question?.attributes?.type);
          if (question?.attributes?.type === 'text') {
            return (
              <AnswerTextInput
                key={answer?.id}
                setIsAnyError={setIsAnyError}
                index={index}
                setQuestionInput={setQuestionInput}
                answer={answer}
                question={answer?.attributes?.question?.data}
                isEditing={isEditing}
              />
            );
          } else {
            return (
              <AnswerImageInput
                key={answer.id}
                index={index}
                setQuestionInput={setQuestionInput}
                answer={answer}
                question={answer?.attributes?.question?.data}
                isEditing={isEditing}
              />
            );
          }
        })}
        {answers.length === 0 ? (
          <p>No Questions for this profile!!</p>
        ) : isEditing ? (
          <Input
            size="lg"
            disabled={isAnyError}
            type="submit"
            value="Save"
            cursor="pointer"
            borderColor="green.400"
            color="green.400"
            _hover={{
              color: 'green.600',
              borderColor: 'green.600',
            }}
          />
        ) : (
          <FormControl>
            <Input
              onClick={() => setIsEditing(true)}
              size="lg"
              type="submit"
              value="Edit"
              cursor="pointer"
            />
          </FormControl>
        )}
      </form>
    </Box>
  );
}

export default AnswersInfo;
