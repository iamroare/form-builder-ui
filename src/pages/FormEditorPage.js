// src/pages/FormEditorPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';
import Question from '../components/Question';

const FormEditorPage = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  const handleAddQuestion = (type) => {
    setQuestions([...questions, { type, content: '', options: [], image: '' }]);
  };

  const handleSaveForm = async () => {
    const formData = {
      title: formTitle,
      description: formDescription,
      headerImage,
      questions,
    };

    console.log("Line 25", formData);
    try {
      const response = await axios.post('http://localhost:5000/api/forms/create', formData);
      alert('Form created successfully');
      navigate(`/preview/${response.data.formId}`);  // Use navigate instead of history.push
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Form</h1>
      <div>
        <label>Form Title</label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="block w-full p-2 mt-2 mb-4 border rounded"
        />
        <label>Form Description</label>
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          className="block w-full p-2 mt-2 mb-4 border rounded"
        />
        <label>Header Image URL</label>
        <input
          type="text"
          value={headerImage}
          onChange={(e) => setHeaderImage(e.target.value)}
          className="block w-full p-2 mt-2 mb-4 border rounded"
        />
      </div>

      <div className="mb-6">
        <button
          onClick={() => handleAddQuestion('Categorize')}
          className="p-2 bg-blue-500 text-white rounded mr-2"
        >
          Add Categorize Question
        </button>
        <button
          onClick={() => handleAddQuestion('Cloze')}
          className="p-2 bg-green-500 text-white rounded mr-2"
        >
          Add Cloze Question
        </button>
        <button
          onClick={() => handleAddQuestion('Comprehension')}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          Add Comprehension Question
        </button>
      </div>

      {questions.map((question, idx) => (
        <Question
          key={idx}
          question={question}
          index={idx}
          onQuestionChange={handleQuestionChange} // Pass handler to update question
        />
      ))}

      <button
        onClick={handleSaveForm}
        disabled={questions.length === 0}  // Disable button if no questions
        className={`mt-6 p-2 text-white rounded ${questions.length === 0 ? 'bg-gray-500' : 'bg-blue-600'}`}
      >
        Save Form
      </button>
    </div>
  );
};

export default FormEditorPage;
