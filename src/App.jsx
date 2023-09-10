import { useState, useEffect } from "react";
import StartPage from "./components/startPage";
import QuestionsPage from "./components/QuestionsPage";
import {
  categoriesURL,
  getDataFromServer,
  generateQuestions,
} from "./data/questionsFromServer";

function App() {
  const basicQuestionStatus = {
    correctAnswers: 0,
    markedAnswers: 0,
    quizCanBeFinished: false,
    showCorrectAnswers: false,
  };

  const [isStartingPageVisible, updateStatusForStartingPage] = useState(true);
  const [questionCategories, updateCategories] = useState([]);
  const [questionsURL, updateURL] = useState("");
  const [choosenCategorie, updateChoosenCategorie] = useState({
    categoryName: "",
    category: "",
    quantityOfQuestions: 5,
  });
  const [allQuestionsInDataBase, updateAllQuestionsInDataBase] = useState();
  const [quantityOfAllQuestionsInDataBase, updateQuantityOfQuestions] =
    useState(0);
  const [categoriesAndQuestionsStatus, changeCategoriesAndQuestionsStatus] =
    useState({
      categories: false,
      Questions: false,
      generalStatus: false,
    });
  const [questionsinQuiz, updateQuestions] = useState([]);
  const [questionsStatus, updateQuestionStatus] = useState(basicQuestionStatus);

  //Get Categories
  useEffect(() => {
    let isDataFetchedSuccessfully = false;
    let data;

    const getCategories = async () => {
      try {
        data = await getDataFromServer(categoriesURL);
        isDataFetchedSuccessfully = true;
      } catch (error) {
        console.error(error);
      } finally {
        if (isDataFetchedSuccessfully) {
          updateCategories(data.trivia_categories);
          changeCategoriesAndQuestionsStatus((prevValue) => ({
            ...prevValue,
            categories: true,
          }));
          updateChoosenCategorie((prevValue) => ({
            ...prevValue,

            category: data.trivia_categories[0].id,
          }));
        }
      }
    };
    getCategories();
  }, []);

  //CategoryName
  function generateCategoryName() {
    const categoryObject = questionCategories.find(
      (item) => item.id === parseInt(choosenCategorie.category, 10)
    );
    if (categoryObject) {
      updateChoosenCategorie((prevValue) => ({
        ...prevValue,
        categoryName: categoryObject.name,
      }));
    }
  }

  //Generate URL to categories
  useEffect(() => {
    const generateUrl = (amoutOfQuestions = 100) => {
      return `https://opentdb.com/api.php?amount=${amoutOfQuestions}&category=${choosenCategorie.category}`;
    };
    updateURL(generateUrl());
  }, [choosenCategorie.category]);

  //getAllQuestionsFromDataBase
  useEffect(() => {
    let isDataFetchedSuccessfully = false;
    let data = [];
    const getQuestions = async () => {
      try {
        data = await getDataFromServer(questionsURL);

        isDataFetchedSuccessfully = true;
      } catch (error) {
        console.error(error);
      } finally {
        if (isDataFetchedSuccessfully) {
          updateAllQuestionsInDataBase(data.results);
          updateQuantityOfQuestions(data.results.length);
          changeCategoriesAndQuestionsStatus((prevValue) => ({
            ...prevValue,
            Questions: true,
          }));
        }
      }
    };
    const delay = 300;
    const timerId = setTimeout(() => {
      getQuestions();
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [questionsURL]);

  //Check General Status of the data
  useEffect(() => {
    categoriesAndQuestionsStatus.generalStatus =
      categoriesAndQuestionsStatus.categories &&
      categoriesAndQuestionsStatus.Questions
        ? true
        : false;
  }, [
    allQuestionsInDataBase,
    questionCategories,
    choosenCategorie,
    isStartingPageVisible,
  ]);

  //Categories from front page
  function handleCategoryChange(event) {
    const { name, value } = event.target;
    updateChoosenCategorie((prevValue) => {
      if (value <= quantityOfAllQuestionsInDataBase) {
        return {
          ...prevValue,
          [name]: value,
        };
      } else return prevValue;
    });
  }

  //update user Answers
  function handleQuestions(event) {
    const { id, name, value } = event.target;
    const { isAnswerCorrect } = event.target.dataset;

    updateQuestions((prevValue) => {
      return prevValue.map((current) => {
        if (current.questionID === name) {
          return {
            ...current,
            userAnswer: value,
            isUserAnswerCorrect: isAnswerCorrect === "true" ? true : false, //Boolean(isAnswerCorrect) not working correctly
            userAnswerID: id,
          };
        }
        return current;
      });
    });
  }

  //Check number of marked questions
  useEffect(() => {
    const markedAnswers = questionsinQuiz.reduce((quantity, element) => {
      if (element.userAnswer !== "") {
        quantity++;
      }
      return quantity;
    }, 0);

    const markedAllAnswers = markedAnswers === questionsinQuiz.length;
    updateQuestionStatus((prevValue) => ({
      ...prevValue,
      markedAnswers: markedAnswers,
      quizCanBeFinished: markedAllAnswers,
    }));
  }, [questionsinQuiz]);

  async function startQuiz() {
    generateCategoryName();
    const questionsInQuiz = async () =>
      generateQuestions(
        allQuestionsInDataBase,
        choosenCategorie.quantityOfQuestions
      );
    const questions = await questionsInQuiz();
    updateQuestions(questions);
    updateStatusForStartingPage(false);
    updateQuestionStatus(basicQuestionStatus);

    return questions;
  }

  function changeCategory() {
    updateStatusForStartingPage(true);
  }

  function checkUserAnswers() {
    const correctAnswers = questionsinQuiz.reduce((quantity, element) => {
      if (element.isUserAnswerCorrect === true) {
        quantity++;
      }
      return quantity;
    }, 0);

    updateQuestionStatus((prevValue) => ({
      ...prevValue,
      correctAnswers: correctAnswers,
      showCorrectAnswers: true,
    }));
  }

  //-----------------------------------------------------------------------------------------------

  return (
    <main>
      {isStartingPageVisible ? (
        <StartPage
          categories={questionCategories}
          choosenCategorie={choosenCategorie}
          handleCategoriesChange={handleCategoryChange}
          categoriesAndQuestionsStatus={categoriesAndQuestionsStatus}
          startQuiz={startQuiz}
        />
      ) : (
        <QuestionsPage
          category={choosenCategorie.categoryName}
          questions={questionsinQuiz}
          handleAnswerChange={handleQuestions}
          checkQuize={checkUserAnswers}
          questionsStatus={questionsStatus}
          newQuestions={startQuiz}
          changeCategory={changeCategory}
        />
      )}
    </main>
  );
}

export default App;
