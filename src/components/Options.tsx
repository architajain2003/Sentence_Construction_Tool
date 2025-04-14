import React from 'react';

interface OptionsProps {
  options: string[];
  onSelect: (word: string) => void;
  usedWords: string[];
}

const Options: React.FC<OptionsProps> = ({ options, onSelect, usedWords }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          disabled={usedWords.includes(option)}
          className={`px-4 py-2 rounded ${
            usedWords.includes(option)
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
