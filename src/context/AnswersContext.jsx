import { createContext, useContext, useState } from 'react';

const AnswersContext = createContext({
  answers: [],
  handleAddAnswer: () => {},
  deleteSubmittedAnswers: () => {},
});

export const useAnswersContext = () => useContext(AnswersContext);

export const AnswersContextProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);

  const handleAddAnswer = (data) => {
    setAnswers((prevAnswers) => {
      if (prevAnswers.length === 0) return prevAnswers.concat(data);

      if (prevAnswers.some((el) => el.question === data[0].question)) {
        const filteredQuestions = prevAnswers.filter((el) => el.question !== data[0].question);
        const newAnswer = filteredQuestions.concat(data);
        return newAnswer;
      } else {
        return prevAnswers.concat(data);
      }
    });
  };

  const deleteSubmittedAnswers = () => {
    setAnswers([]);
  };

  const contextData = {
    answers,
    handleAddAnswer,
    deleteSubmittedAnswers,
  };

  return <AnswersContext.Provider value={contextData}>{children}</AnswersContext.Provider>;
};

export default AnswersContext;
