import React, { useState, useEffect } from "react";

import { categoriesURL, getDataFromServer } from "../data/dataFromServer";

function StartPage(props) {
  const [questionCategories, updateCategories] = useState([]);
  const [categoriesStatus, changeCategoriesStatus] = useState(false);
  const [dropDownCategories, populateDropDownCategories] = useState("");
  const [choosenCategorie, updateChoosenCategorie] = useState({
    category: "",
    quantityOfQuestions: 5,
  });
  const [questionsURL, updateURL] = useState("");
  const [allQuestionsInDataBase, updateAllQuestionsInDataBase] = useState();
  const [numberOfAvaiableQuestions, updateNumberOfAvaiableQuestions] =
    useState(0);

  //Get Categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getDataFromServer(categoriesURL);
        updateCategories(data.trivia_categories);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  //Check Categories Status and generate drop down list
  useEffect(() => {
    if (questionCategories.length > 0) {
      // Add check for length
      changeCategoriesStatus(true);
      populateDropDownCategories(
        questionCategories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })
      );
      updateChoosenCategorie((prevState) => ({
        ...prevState,
        category: questionCategories[0].id,
      }));
    }
  }, [questionCategories]);

  //Drop Down update Status
  function handleChange(event) {
    const { name, value } = event.target;
    updateChoosenCategorie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  //Generate categories URL
  useEffect(() => {
    const generateUrl = (amoutOfQuestions = 100) => {
      return `https://opentdb.com/api.php?amount=${amoutOfQuestions}&category=${choosenCategorie.category}`;
    };
    updateURL(generateUrl());
  }, [choosenCategorie.category]);

  //getAllQuestionsFromDataBase
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await getDataFromServer(questionsURL);
        updateAllQuestionsInDataBase(data);
        updateNumberOfAvaiableQuestions(data.results.length);
      } catch (error) {
        console.error(error);
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

  //------------------------------------------------------------------------------------------------------
  return (
    <div className="startPage-container">
      <div className="startingPageDescription-container">
        <h1>Quiz</h1>
        <span className="quizDescription">Check how good you are !!</span>
      </div>
      <label htmlFor="category">Chose Category</label>
      <select
        id="category"
        value={choosenCategorie.category}
        onChange={handleChange}
        name="category"
      >
        {dropDownCategories}
      </select>
      <label>
        Number of Questions:
        <input
          type="number"
          onChange={handleChange}
          name="quantityOfQuestions"
          value={choosenCategorie.quantityOfQuestions}
        />
      </label>
      <button
        disabled={!categoriesStatus}
        onClick={() =>
          props.startButtonFunction(
            allQuestionsInDataBase.results,
            choosenCategorie.quantityOfQuestions
          )
        }
      >
        {!categoriesStatus ? "Can't start quiz" : "Start quiz"}
      </button>
    </div>
  );
}

export default StartPage;
