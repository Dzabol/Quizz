export default function QuestionContainer(props) {
  const id = crypto.randomUUID();
  const answers = props.question.answers.map((answer) => (
    <div key={crypto.randomUUID()}>
      <input
        type="radio"
        id={crypto.randomUUID()}
        name={id}
        value={answer.answer}
        onChange={props.handleChange}
      />
      <label htmlFor={crypto.randomUUID()}>{answer.answer}</label>
    </div>
  ));

  return (
    <div>
      <p>{props.question.question}</p>
      {answers}
    </div>
  );
}
