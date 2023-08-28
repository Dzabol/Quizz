const categories = {
  movies: "https://opentdb.com/api.php?amount=100&category=11",
};

function generateRandomQuestionsNumbersFromDataBase(
  quantity,
  allQuestionsArray
) {
  const questionsQuantityInDataBase = allQuestionsArray.length;
  const questionsQuantity =
    quantity > questionsQuantityInDataBase ? 5 : quantity;

  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < questionsQuantity) {
    const randomNumber = Math.ceil(Math.random() * questionsQuantityInDataBase);
    uniqueNumbers.add(randomNumber);
  }
  return Array.from(uniqueNumbers);
}

function generateQuestions(questionsQuantity, allQuestionsArray) {
  const questionNumbers = generateRandomQuestionsNumbersFromDataBase(
    questionsQuantity,
    allQuestionsArray
  );

  const questions = questionNumbers.map((questionIndex) => {
    return {
      question: allQuestionsArray[questionIndex].question,
      correct_answer: allQuestionsArray[questionIndex].correct_answer,
      incorrect_answers: allQuestionsArray[questionIndex].incorrect_answers,
    };
  });

  return questions;
}

export { categories, generateQuestions };
