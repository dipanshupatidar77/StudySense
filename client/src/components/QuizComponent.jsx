import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/quizComponent.css';

export default function QuizComponent({ questions }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/explore'); // ⬅ Form page ka route
  };

  return (
    <div className="quiz-container">
      <h2>Generated Questions</h2>

      {questions.map((q, index) => (
        <div className="question-card" key={index}>
          <h3>Q{index + 1}: {q.question || 'No Question Provided'}</h3>

          {Array.isArray(q.options) && q.options.length > 0 ? (
            <>
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
              <p><strong>Answer:</strong> {q.answer?.trim() ? q.answer : 'N/A'}</p>
            </>
          ) : (
            <p><strong>Answer:</strong> {q.answer?.trim() ? q.answer : 'N/A'}</p>
          )}

          <p><strong>Explanation:</strong> {q.explanation?.trim() ? q.explanation : 'N/A'}</p>
        </div>
      ))}

      {/*  Back button */}
      <button onClick={handleBack} className="back-button">GO Back</button>
    </div>
  );
}
