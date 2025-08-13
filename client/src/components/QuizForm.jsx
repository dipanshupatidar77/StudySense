
// import React, { useState } from 'react';
// import '../styles/quizForm.css';

// const subjectTopicsMap = {
//   DBMS: ['Transactions', 'Normalization', 'ER Model'],
//   OS: ['Process Scheduling', 'Deadlocks', 'Memory Management'],
//   OOPS: ['Inheritance', 'Polymorphism', 'Encapsulation'],
//   CN: ['OSI Model', 'TCP/IP', 'Routing Protocols'],
// };

// export default function QuizForm({ onSubmit }) {
//   const [form, setForm] = useState({
//     subject: 'DBMS',
//     topic: ['Transactions'], // default topic for DBMS
//     difficulty: 'medium',
//     type: 'mcq',
//     number: 5,
//     note: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'subject') {
//       setForm({
//         ...form,
//         subject: value,
//         topic: [subjectTopicsMap[value][0]], // reset topic on subject change
//       });
//     } else if (name === 'topic') {
//       const options = [...e.target.selectedOptions].map((o) => o.value);
//       setForm({ ...form, topic: options });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       subject: form.subject,
//       topics: form.topic,
//       difficulty: form.difficulty,
//       type: form.type === 'short' ? 'short answer' : form.type,
//       number: Number(form.number),
//       note: form.note.trim(),
//     };
//     onSubmit(formData);
//   };

//   return (
//     <form className="quiz-form" onSubmit={handleSubmit}>
//       <label>Subject</label>
//       <select name="subject" value={form.subject} onChange={handleChange} required>
//         {Object.keys(subjectTopicsMap).map((subj) => (
//           <option key={subj} value={subj}>{subj}</option>
//         ))}
//       </select>

//       <label>Topics (hold Ctrl to multi-select)</label>
//       <select
//         name="topic"
//         multiple
//         value={form.topic}
//         onChange={handleChange}
//         required
//       >
//         {subjectTopicsMap[form.subject].map((topic) => (
//           <option key={topic} value={topic}>{topic}</option>
//         ))}
//       </select>

//       <label>Difficulty</label>
//       <select name="difficulty" value={form.difficulty} onChange={handleChange}>
//         <option value="easy">Easy</option>
//         <option value="medium">Medium</option>
//         <option value="hard">Hard</option>
//       </select>

//       <label>Type</label>
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="mcq">MCQ</option>
//         <option value="short">Short Answer</option>
//       </select>

//       <input
//         type="number"
//         name="number"
//         min="1"
//         max="20"
//         value={form.number}
//         onChange={handleChange}
//         required
//       />

//       <textarea
//         name="note"
//         placeholder="Note (optional)"
//         value={form.note}
//         onChange={handleChange}
//       ></textarea>

//       <button type="submit">Generate Questions</button>
//     </form>
//   );
// }


import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/quizForm.css';

const subjectTopicsMap = {
  DBMS: ['Transactions', 'Normalization', 'ER Model'],
  OS: ['Process Scheduling', 'Deadlocks', 'Memory Management'],
  OOPS: ['Inheritance', 'Polymorphism', 'Encapsulation'],
  CN: ['OSI Model', 'TCP/IP', 'Routing Protocols'],
};

export default function QuizForm({ onSubmit }) {
  const [form, setForm] = useState({
    subject: 'DBMS',
    topic: ['Transactions'],
    difficulty: 'medium',
    type: 'mcq',
    number: 5,
    note: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'subject') {
      setForm({
        ...form,
        subject: value,
        topic: [subjectTopicsMap[value][0]],
      });
    } else if (name === 'topic') {
      const options = [...e.target.selectedOptions].map((o) => o.value);
      setForm({ ...form, topic: options });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      subject: form.subject,
      topics: form.topic,
      difficulty: form.difficulty,
      type: form.type === 'short' ? 'short answer' : form.type,
      number: Number(form.number),
      note: form.note.trim(),
    };

    try {
      setLoading(true);

      // Show loading message using SweetAlert
      Swal.fire({
        title: 'Loading Quiz...',
        text: 'Generating questions for you...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await onSubmit(formData); // wait for onSubmit to finish

      Swal.close(); // close loading when done
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to generate quiz. Please try again.',
      });
    }
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <label>Subject</label>
      <select name="subject" value={form.subject} onChange={handleChange} required>
        {Object.keys(subjectTopicsMap).map((subj) => (
          <option key={subj} value={subj}>{subj}</option>
        ))}
      </select>

      <label>Topics (hold Ctrl to multi-select)</label>
      <select
        name="topic"
        multiple
        value={form.topic}
        onChange={handleChange}
        required
      >
        {subjectTopicsMap[form.subject].map((topic) => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>

      <label>Difficulty</label>
      <select name="difficulty" value={form.difficulty} onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label>Type</label>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="mcq">MCQ</option>
        <option value="short">Short Answer</option>
      </select>

      <input
        type="number"
        name="number"
        min="1"
        max="20"
        value={form.number}
        onChange={handleChange}
        required
      />

      <textarea
        name="note"
        placeholder="Note (optional)"
        value={form.note}
        onChange={handleChange}
      ></textarea>

      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Questions'}
      </button>
    </form>
  );
}
