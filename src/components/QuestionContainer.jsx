import React from "react";

export default function QuestionContainer(props) {
  const answers = props.question.answers.map((answer) => {
    return (
      <div key={crypto.randomUUID()} className="radio-container">
        <input
          type="radio"
          id={answer.answerID}
          name={props.id}
          value={answer.answer}
          data-is-answer-correct={answer.isCorrect}
          onChange={props.onChange}
          checked={props.allQuestions.some((question) => {
            return (
              question.questionID === props.id &&
              question.userAnswer === answer.answer
            );
          })}
          disabled={!props.disabled}
        />
        <label htmlFor={answer.answerID} className="radio-label">
          {answer.answer}
        </label>
      </div>
    );
  });

  return (
    <div>
      <p>{props.question.question}</p>
      <div className="answers-container">{answers}</div>

      <div className="line"></div>
    </div>
  );
}
