import { useState, useEffect } from "react";
/* Components */
import StartPage from "./components/startPage";

/* Functions */
import {
  categoriesURL,
  getDataFromServer,
  checkResponse,
} from "./data/dataFromServer";
import { generateQuestions } from "./data/questionsFromServer";

function App() {
  const [startPageIsVisibe, updateStartPageVisibility] = useState(true);
  const [categoryURL, updateCategoryURL] = useState("");
  const [allQuestionsFromDataBase, updateQuestionsFromDataBase] = useState([]);

  console.log(allQuestionsFromDataBase);

  function startQuizFunction(categoriesURL) {
    updateCategoryURL(categoriesURL);
    updateStartPageVisibility(false);
  }

  //Get questions from server
  useEffect(() => {
    if (categoryURL) {
      updateQuestionsFromDataBase(getDataFromServer(categoryURL));
    }
  }, [categoryURL]);

  return (
    <main>
      {startPageIsVisibe ? (
        <StartPage startButtonFunction={startQuizFunction} />
      ) : (
        "test"
      )}
    </main>
  );
}

export default App;
