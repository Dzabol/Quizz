import { decode } from "html-entities";
const categoriesURL = "https://opentdb.com/api_category.php";

async function getDataFromServer(serverAddress) {
  try {
    const response = await fetch(serverAddress);
    if (!response.ok) {
      throw new Error(
        `An error occurred while fetching data from the server: ${response}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data from the server.");
  }
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Losowy index od 0 do i
    [array[i], array[j]] = [array[j], array[i]]; // Zamiana miejscami elementów
  }
}

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
      answerID: crypto.randomUUID(),
    };
    const incorrect_answers = allQuestionsArray[
      questionIndex
    ].incorrect_answers.map((incorrectAnswer) => {
      return {
        answer: decode(incorrectAnswer),
        isCorrect: false,
        answerID: crypto.randomUUID(),
      };
    });
    const answers = [correctAnswer, ...incorrect_answers];
    shuffleArray(answers);
    return {
      questionID: crypto.randomUUID(),
      question: question,
      answers: answers,
      userAnswer: "",
      isUserAnswerCorrect: false,
      userAnswerID: "",
    };
  });
  return questions;
}

export { categoriesURL, getDataFromServer, generateQuestions };
