const { createContext, useContext, useState } = require('react');

const QuestionsOrderContext = createContext({
  currentOrder: 0,
  addOrderForQuestion: () => {},
});

export const useQuestionsOrderContext = () => useContext(QuestionsOrderContext);

export const QuestionsOrderContextProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(0);
  console.log(currentOrder, 'ORDER IZ CONTEXT_A');

  const addOrderForQuestion = () => {
    setCurrentOrder((prevOrder) => prevOrder + 1);
  };

  const orderContext = {
    currentOrder,
    addOrderForQuestion,
  };

  return (
    <QuestionsOrderContext.Provider value={orderContext}>{children}</QuestionsOrderContext.Provider>
  );
};

export default QuestionsOrderContext;
