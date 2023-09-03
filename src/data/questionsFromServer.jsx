import { decode } from "html-entities";

async function generateQuestions(allQuestionsArray, questionsQuantity = 5) {
  const randomQuestionNumbers =
    await generateRandomQuestionsNumbersFromDataBase(
      allQuestionsArray,
      questionsQuantity
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

async function generateRandomQuestionsNumbersFromDataBase(
  allQuestionsArray,
  quantity
) {
  const questionsQuantityInDataBase = allQuestionsArray.length;
  const questionsQuantity =
    quantity > questionsQuantityInDataBase
      ? questionsQuantityInDataBase
      : quantity;

  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < questionsQuantity) {
    const randomNumber = Math.ceil(Math.random() * questionsQuantityInDataBase);
    uniqueNumbers.add(randomNumber);
  }
  return Array.from(uniqueNumbers);
}

export { generateQuestions };
