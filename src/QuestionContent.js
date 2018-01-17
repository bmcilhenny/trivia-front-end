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
      <h3>{props.question.length ? props.question.question : "Loading"}.</h3>
      <ul>
      {props.question.length ? this.shuffled.map(answer => <button key={answer.id}>{answer}</button>) : "Loading"}
      </ul>
    </div>
  )
}

export default QuestionContent;
