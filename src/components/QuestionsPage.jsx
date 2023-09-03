import React from "react";
import QuestionContainer from "./QuestionContainer";

export default function QuestopnPage(props) {
  const questions = props.questions.map((question) => {
    return (
      <QuestionContainer
        key={crypto.randomUUID()}
        id={crypto.randomUUID()}
        question={question}
      />
    );
  });

  return (
    <div>
      <div className="questions-container">{questions}</div>
      <button>Check Answers</button>
    </div>
  );
}
