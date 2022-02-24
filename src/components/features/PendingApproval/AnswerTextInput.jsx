import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function AnswerTextInput({ answer, question, index, setQuestionInput, isEditing, setIsAnyError }) {
  const [input, setInput] = useState(answer?.attributes?.answer);

  const isInputEmpty = input === '';

  useEffect(() => {
    if (isInputEmpty) setIsAnyError(true);
    else setIsAnyError(false);
  }, [isInputEmpty]);

  const handleInputChange = (e) => {
    setQuestionInput(e.target.value, index);
    setInput(e.target.value);
  };

  return (
    <FormControl isInvalid={isInputEmpty} mb="1rem">
      <FormLabel htmlFor="answer" fontSize="1.5rem">
        {`Question ${index + 1} - ` + question?.attributes?.text}
      </FormLabel>
      <Input
        disabled={!isEditing}
        size="lg"
        id="answer"
        type="text"
        value={input}
        onChange={handleInputChange}
      />
      {!isInputEmpty ? (
        <FormHelperText>Enter the answer you would like.</FormHelperText>
      ) : (
        <FormErrorMessage>Answer is required.</FormErrorMessage>
      )}
    </FormControl>
  );
}

export default AnswerTextInput;
