import React from 'react';

interface SentenceProps {
  sentence: string;
  selectedWords: string[];
  onBlankClick: (index: number) => void;
}

const Sentence: React.FC<SentenceProps> = ({ sentence, selectedWords, onBlankClick }) => {
  const parts = sentence.split('_____________');

  return (
    <p className="text-xl text-gray-800">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < selectedWords.length && (
            <span
              className="inline-block min-w-[100px] border-b-2 border-gray-400 text-center cursor-pointer mx-1"
              onClick={() => onBlankClick(index)}
            >
              {selectedWords[index] || '______'}
            </span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};

export default Sentence;
