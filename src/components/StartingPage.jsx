import React from "react";

export default function StartingPage(props) {
  return (
    <div className="start-container">
      <h1>Quizz</h1>
      <p>Check you knowledge</p>
      <button onClick={props.onClick}>Start quiz</button>
    </div>
  );
}
