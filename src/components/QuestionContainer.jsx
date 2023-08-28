import React from "react";

export default function QuestionContainer(props) {
  const question = props.question;
  const id = props.id;
  console.log(props.answers);
  const answers = props.answers.map((answer) => {
    return (
      <ul key={crypto.randomUUID()}>
        <label htmlFor={answer.answer}>{answer.answer}</label>
        <input
          type="radio"
          id={answer.answer}
          name={id} //single selection
          value={answer.isCorrect}
        />
      </ul>
    );
  });

  return (
    <div className="question-container">
      <h1>{question}</h1>
      <div className="answers-container">{answers}</div>
      <div className="line"></div>
    </div>
  );
}
