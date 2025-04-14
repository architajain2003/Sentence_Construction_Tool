import { useEffect, useState } from 'react';
import axios from 'axios';
import Sentence from '../components/Sentence';
import Options from '../components/Options';
import Timer from '../components/Timer';
import { Question } from '../types';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<Question[]>('http://localhost:3000/questions').then((res) => {
      setQuestions(res.data);
    });
  }, []);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) handleNext();
  }, [timeLeft]);

  const handleWordSelect = (word: string) => {
    const firstBlank = selectedWords.findIndex((w) => w === '');
    if (firstBlank !== -1) {
      const newSelected = [...selectedWords];
      newSelected[firstBlank] = word;
      setSelectedWords(newSelected);
    }
  };

  const handleBlankClick = (index: number) => {
    const newSelected = [...selectedWords];
    newSelected[index] = '';
    setSelectedWords(newSelected);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers, selectedWords];
    if (currentIndex + 1 === questions.length) {
      navigate('/result', {
        state: {
          userAnswers: updatedAnswers,
          questions,
        },
      });
    } else {
      setUserAnswers(updatedAnswers);
      setCurrentIndex((prev) => prev + 1);
      setSelectedWords(new Array(questions[currentIndex + 1].correctAnswer.length).fill(''));
      setTimeLeft(30);
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      const blanks = currentQuestion.correctAnswer.length;
      setSelectedWords(new Array(blanks).fill(''));
    }
  }, [currentQuestion]);

  if (!currentQuestion) return <div className="loading">Loading...</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="question-title">Question {currentIndex + 1} / {questions.length}</h2>
        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      </div>

      <Sentence
        sentence={currentQuestion.question}
        selectedWords={selectedWords}
        onBlankClick={handleBlankClick}
      />

      <Options
        options={currentQuestion.options}
        onSelect={handleWordSelect}
        usedWords={selectedWords.filter(Boolean)}
      />

      <button
        disabled={selectedWords.includes('')}
        onClick={handleNext}
        className="next-button"
      >
        Next
      </button>
    </div>
  );
}
