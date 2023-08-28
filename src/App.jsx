import { useState, useEffect } from "react";
import StartingPage from "./components/StartingPage";
import QuestionContainer from "./components/QuestionContainer";
import { categories, generateQuestions } from "./data/questions";

function App() {
  const questionsQuantity = 5;
  const category = categories.movies;
  const [allQuestions, updateQuestions] = useState([]);
  const [currentQuestions, updateCurrentQuestions] = useState([]);

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
  useEffect(() => {
    if (allQuestions.length > 0) {
      const questions = generateQuestions(questionsQuantity, allQuestions);
      updateCurrentQuestions(questions);
    }
  }, [allQuestions]);

  const setOfQuestions = currentQuestions.map((question) => (
    <QuestionContainer
      key={crypto.randomUUID()}
      id={crypto.randomUUID()}
      questionData={question}
    />
  ));

  return (
    <main>
      {/* <StartingPage /> */}
      {setOfQuestions}
    </main>
  );
}

export default App;
