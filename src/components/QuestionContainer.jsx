import React from "react";

export default function QuestionContainer(props) {
  const answers_id = crypto.randomUUID();
  const answers = props.question.answers.map((answer) => {
    const answer_id = crypto.randomUUID();
    return (
      <div key={crypto.randomUUID()}>
        <input
          type="radio"
          id={answer_id}
          name={answers_id}
          value={answer.answer}
          onChange={props.handleChange}
        />
        <label htmlFor={answer_id}>{answer.answer}</label>
      </div>
    );
  });

  return (
    <div>
      <p>{props.question.question}</p>
      {answers}
    </div>
  );
}
