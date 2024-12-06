// src/components/Question.js
import React, { useState, useEffect } from 'react';

const Question = ({ question, index, onQuestionChange }) => {
  const [questionData, setQuestionData] = useState(question);

  // Update local state when the parent `question` prop changes (useEffect to sync)
  useEffect(() => {
    setQuestionData(question);
  }, [question]);

  const handleContentChange = (e) => {
    const updatedQuestion = { ...questionData, content: e.target.value };
    setQuestionData(updatedQuestion);
    onQuestionChange(index, updatedQuestion); // Notify parent of the change
  };

  const handleImageChange = (e) => {
    const updatedQuestion = { ...questionData, image: e.target.value };
    setQuestionData(updatedQuestion);
    onQuestionChange(index, updatedQuestion); // Notify parent of the change
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <label className="block mb-2">Question {index + 1}</label>
      <input
        type="text"
        value={questionData.content}
        onChange={handleContentChange}
        className="block w-full p-2 mb-4 border rounded"
        placeholder="Enter question content"
      />
      <label className="block mb-2">Image URL (Optional)</label>
      <input
        type="text"
        value={questionData.image}
        onChange={handleImageChange}
        className="block w-full p-2 mb-4 border rounded"
        placeholder="Enter image URL"
      />
    </div>
  );
};

export default Question;
