import React from "react";
import { useState, useEffect } from "react";

import QuestionContainer from "./QuestionContainer";

export default function QuestionsPage(props) {
  const {
    questions,
    handleAnswerChange,
    checkQuize,
    questionsStatus,
    newQuestions,
  } = props;
  const GeneratedQuestions = questions.map((currentQuestion) => {
    return (
      <QuestionContainer
        key={crypto.randomUUID()}
        id={currentQuestion.questionID}
        question={currentQuestion}
        onChange={handleAnswerChange}
        allQuestions={questions}
        disabled={!questionsStatus.showCorrectAnswers}
      />
    );
  });

  return (
    <div>
      <div className="questions-container">{GeneratedQuestions}</div>
      {questionsStatus.showCorrectAnswers && (
        <div className="score-container">
          {`You scored ${questionsStatus.correctAnswers} / ${questions.length} correct answers`}
        </div>
      )}
      <div className="button-contaner">
        {/* quiz button */}
        {!questionsStatus.showCorrectAnswers ? (
          <button
            onClick={checkQuize}
            disabled={!questionsStatus.quizCanBeFinished}
          >
            Check Answers
          </button>
        ) : (
          <button onClick={newQuestions}>Generate new questions</button>
        )}

        {questionsStatus.showCorrectAnswers && (
          <button onClick={props.changeCategory}>Change category</button>
        )}
      </div>
    </div>
  );
}
