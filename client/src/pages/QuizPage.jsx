import React, { useState } from 'react';
import QuizForm from '../components/QuizForm';
import QuizComponent from '../components/QuizComponent';
import { generateQuiz } from '../services/quizService';

export default function QuizPage() {
    
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await generateQuiz(formData);
      console.log("Received Quiz Data:", response.data.quiz);

      setQuestions(response.data.quiz); // 👈 Ensure backend sends { quiz: [...] }
      setShowForm(false);
    } catch (error) {
      console.error('Error generating quiz:', error.response?.data || error.message);
    }
  };

  
  return (
    <>
      {showForm && <QuizForm onSubmit={handleFormSubmit} />}
      {!showForm && <QuizComponent questions={questions} />}
    </>
  );
}
