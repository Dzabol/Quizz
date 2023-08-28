import { useState, useEffect } from "react";
import StartingPage from "./components/StartingPage";
import QuestionContainer from "./components/QuestionContainer";
import { categories, generateQuestions } from "./data/questions";
import ReactLoading from "react-loading";

function App() {
  const questionsQuantity = 5;
  const category = categories.movies;
  const [allQuestions, updateQuestions] = useState([]);
  const [currentQuestions, updateCurrentQuestions] = useState([]);
  const [areQuestionsGenerated, updateAreQuestionsGenerated] = useState(false);
  const [categoryPage, updateCategoryPage] = useState(true);

  //Questions from API
  useEffect(() => {
    async function getQuestionsFromApi() {
      const response = await fetch(category);
      const data = await response.json();
      updateQuestions(data.results);
    }
    getQuestionsFromApi();
  }, [category]);

  // Generate questions
  function generateSetOfQuestions() {
    if (allQuestions.length > questionsQuantity) {
      const questions = generateQuestions(questionsQuantity, allQuestions);
      updateCurrentQuestions(questions);
      updateAreQuestionsGenerated(true);
      updateCategoryPage(false);
      console.log(areQuestionsGenerated);
      console.log(categoryPage);
    }
  }

  const setOfQuestions = currentQuestions.map((singleQuestion) => (
    <QuestionContainer
      key={crypto.randomUUID()}
      id={crypto.randomUUID()}
      question={singleQuestion.question}
      answers={singleQuestion.answers}
    />
  ));

  return (
    <main>
      {categoryPage ? (
        <StartingPage onClick={() => generateSetOfQuestions()} />
      ) : currentQuestions.length === questionsQuantity ? (
        setOfQuestions
      ) : (
        <ReactLoading
          type={"spin"}
          color={"#4d5b9e"}
          height={"20%"}
          width={"20%"}
        />
      )}
    </main>
  );
}

export default App;
