import { useLocation, useNavigate } from 'react-router-dom';
import { Question } from '../types';
import '../index.css';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAnswers, questions }: { userAnswers: string[][], questions: Question[] } = location.state;

  const getScore = () => {
    return userAnswers.reduce((score, answer, i) => {
      const correct = JSON.stringify(answer) === JSON.stringify(questions[i].correctAnswer);
      return correct ? score + 1 : score;
    }, 0);
  };

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Results</h1>
      <p className="result-score">Score: {getScore()} / {questions.length}</p>

      <div className="result-list">
        {questions.map((q, i) => {
          const isCorrect = JSON.stringify(userAnswers[i]) === JSON.stringify(q.correctAnswer);
          return (
            <div key={q.questionId} className="result-question">
              <h2 className="question-text">Q{i + 1}: {q.question}</h2>
              <p>
                Your Answer:{' '}
                <span className={isCorrect ? "correct-answer" : "wrong-answer"}>
                  {userAnswers[i].join(' ')}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  Correct Answer:{' '}
                  <span className="correct-answer">
                    {q.correctAnswer.join(' ')}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate('/')} className="restart-button">
        Restart Quiz
      </button>
    </div>
  );
}
