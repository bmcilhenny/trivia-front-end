import React from 'react';


const QuestionContent = (props) => {

  const shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  const allAnswersArray = [props.correctAnswer, ...props.incorrectAnswers];
  const shuffled = shuffle(allAnswersArray);

  return (
    <div>
      <h1>Question Time!</h1>
      <h3>{props.question}.</h3>
      {shuffled.map(answer => <button key={answer.id}>{answer}</button>)}
    </div>
  )
}

export default QuestionContent;
