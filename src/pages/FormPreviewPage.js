// src/pages/FormPreviewPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormPreviewPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
      setForm(response.data);
    };
    fetchForm();
  }, [formId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/forms/submit', { formId, answers });
      alert('Your response has been submitted!');
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      <p>{form.description}</p>
      {form.questions.map((question) => (
        <div key={question._id} className="mt-6">
          <h3 className="text-xl font-bold">{question.content}</h3>
          <input
            type="text"
            value={answers[question._id] || ''}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            className="block w-full p-2 mt-2 mb-4 border rounded"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 p-2 bg-blue-600 text-white rounded"
      >
        Submit Response
      </button>
    </div>
  );
};

export default FormPreviewPage;
