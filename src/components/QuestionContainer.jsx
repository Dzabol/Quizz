import react from "react";

export default function QuetsionContainer(props) {
  const id = crypto.randomUUID();

  return (
    <div className="question-container">
      <div className="question">props.question</div>
      <div className="answers-container"></div>
    </div>
  );
}
