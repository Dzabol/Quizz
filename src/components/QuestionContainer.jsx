import React from "react";

export default function QuestionContainer(props) {
  const answers = props.question.answers.map((answer) => {
    const isChecked = props.allQuestions.some((question) => {
      return (
        question.questionID === props.id &&
        question.userAnswer === answer.answer
      );
    });

    const answerBackGroundColor = () => {
      if (isChecked && answer.isCorrect) {
        return " correctAnswer";
      }
      if (isChecked && !answer.isCorrect) {
        return " wrongAnswer";
      }
      if (!isChecked && answer.isCorrect) {
        return " correctAnswer";
      } else return "";
    };
    return (
      <div key={crypto.randomUUID()} className="radio-container">
        <input
          type="radio"
          id={answer.answerID}
          name={props.id}
          value={answer.answer}
          data-is-answer-correct={answer.isCorrect}
          onChange={props.onChange}
          checked={isChecked}
          disabled={!props.disabled}
        />
        <label
          htmlFor={answer.answerID}
          className={
            "radio-label" + (!props.disabled ? answerBackGroundColor() : "")
          }
        >
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
