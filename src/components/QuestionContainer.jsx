import React from "react";

export default function QuestionContainer(props) {
  const question = props.questionData.question;
  const id = props.id;

  function generateAnswers() {
    console.log(props.questionData);
  }

  return (
    <div className="question-container">
      <h1>{question}</h1>
      <div className="answers-container">
        <label htmlFor={id}></label>
      </div>
    </div>
  );
}
