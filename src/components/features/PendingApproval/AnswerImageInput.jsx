import { FormControl, FormLabel, Input, FormHelperText, Image, Center } from '@chakra-ui/react';
import { useState } from 'react';

import { API_URL } from 'config/config';

function AnswersImageInput({ answer, question, isEditing, index, setQuestionInput }) {
  const [answerPhoto, setAnswerPhoto] = useState(
    answer?.attributes?.answer ? API_URL + answer?.attributes?.answer : 'https://bit.ly/dan-abramov'
  );

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setAnswerPhoto(e.target.result);
        //setAnswerPhotoFile(files[0]);
        setQuestionInput(files[0], index);
      };

      reader.readAsDataURL(files[0]);
    } else {
      console.log('CANCEL clicked!', answerPhoto);
      setAnswerPhoto(
        answer?.attributes?.answer
          ? API_URL + answer?.attributes?.answer
          : 'https://bit.ly/dan-abramov'
      );
    }
  };

  return (
    <>
      <FormControl mb="1rem">
        <FormLabel htmlFor="answerPhoto" fontSize="1.5rem">
          {`Question ${index + 1} - ` + question?.attributes?.text}
        </FormLabel>
        <Center>
          <Image m="1rem" boxSize="70%" objectFit="cover" src={answerPhoto} alt={'photo answer'} />
        </Center>
        <Input
          disabled={!isEditing}
          h="4.3rem"
          size="lg"
          id="answerPhoto"
          type="file"
          onChange={(e) => handleFileSelected(e)}
          cursor="pointer"
          accept=".png, .jpg, .jpeg"
        />
        <FormHelperText>Change the photo answer.</FormHelperText>
      </FormControl>
    </>
  );
}

export default AnswersImageInput;
