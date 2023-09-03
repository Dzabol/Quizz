import { useState, useEffect } from "react";
import StartPage from "./components/startPage";
import QuestopnPage from "./components/QuestionsPage";
import { generateQuestions } from "./data/questionsFromServer";

function App() {
  const [startPageIsVisibe, updateStartPageVisibility] = useState(true);
  const [allQuestionsFromDataBase, updateQuestionsFromDataBase] = useState([]);
  const [questions, updateQuestions] = useState();

  async function startQuizFunction(
    questionsFromDataBase,
    numberOfTheQuestionsToGenerate
  ) {
    const allQuestions = await questionsFromDataBase;
    const questionsInQuize = await generateQuestions(
      allQuestions,
      numberOfTheQuestionsToGenerate
    );
    console.log(questionsInQuize);

    const updateValues = async () => {
      updateQuestionsFromDataBase(allQuestions);
      updateQuestions(questionsInQuize);
      updateStartPageVisibility(false);
    };
    updateValues();
  }

  return (
    <main>
      {startPageIsVisibe ? (
        <StartPage startButtonFunction={startQuizFunction} />
      ) : (
        <QuestopnPage questions={questions} />
      )}
    </main>
  );
}

export default App;
