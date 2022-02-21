import { createContext, useContext, useState } from 'react';

const QuestionEditContext = createContext({
  questionInfo: {},
  handleIdAndOrder: () => {},
});

export const useQuestionEditContext = () => useContext(QuestionEditContext);

export const QuestionEditProvider = ({ children }) => {
  const [questionInfo, setQuestionInfo] = useState({
    id: 0,
    order: 0,
    text: '',
  });

  const handleIdAndOrder = (data) => {
    setQuestionInfo(data);
  };

  const contextData = {
    questionInfo,
    handleIdAndOrder,
  };

  return (
    <QuestionEditContext.Provider value={contextData}>{children}</QuestionEditContext.Provider>
  );
};

export default QuestionEditContext;
