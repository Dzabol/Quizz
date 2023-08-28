import { decode } from "html-entities";
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
  const randomQuestionNumbers = generateRandomQuestionsNumbersFromDataBase(
    questionsQuantity,
    allQuestionsArray
  );

  const questions = randomQuestionNumbers.map((questionIndex) => {
    const question = decode(allQuestionsArray[questionIndex].question);
    const correctAnswer = {
      answer: decode(allQuestionsArray[questionIndex].correct_answer),
      isCorrect: true,
    };
    const incorrect_answers = allQuestionsArray[
      questionIndex
    ].incorrect_answers.map((incorrectAnswer) => {
      return {
        answer: decode(incorrectAnswer),
        isCorrect: false,
      };
    });
    const answers = [correctAnswer, ...incorrect_answers];
    return {
      question: question,
      answers: answers,
    };
  });
  return questions;
}

export { categories, generateQuestions };

// question: decode(allQuestionsArray[questionIndex].question),
// correct_answer: allQuestionsArray[questionIndex].correct_answer,
// incorrect_answers: allQuestionsArray[questionIndex].incorrect_answers,
