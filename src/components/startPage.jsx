import React, { useState, useEffect } from "react";

function StartPage(props) {
  const {
    categories,
    choosenCategorie,
    handleCategoriesChange,
    categoriesAndQuestionsStatus,
    startQuiz,
  } = props;

  let dropDownCategories = categories.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

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
        onChange={handleCategoriesChange}
        name="category"
      >
        {dropDownCategories}
      </select>
      <label>
        Number of Questions:
        <input
          type="number"
          onChange={handleCategoriesChange}
          name="quantityOfQuestions"
          value={choosenCategorie.quantityOfQuestions}
        />
      </label>
      <button
        disabled={!categoriesAndQuestionsStatus.generalStatus}
        onClick={startQuiz}
      >
        {!categoriesAndQuestionsStatus.generalStatus
          ? "Can't start quiz, some server issues"
          : "Start quiz"}
      </button>
    </div>
  );
}

export default StartPage;
