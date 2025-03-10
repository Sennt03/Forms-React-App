import { memo, useState } from 'react';
import './Question.css'

export const Question = memo(({ question, onUpdate, onDelete, onActive }) => {
  const [editedQuestion, setEditedQuestion] = useState(question);

  const updateQuestion = (updatedValues) => {
    const updatedQuestion = { ...editedQuestion, ...updatedValues };
    setEditedQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
  };

  const handleQuestionTextChange = (e) => {
    updateQuestion({ text: e.target.value });
  };

  const handleTypeChange = (e) => {
    updateQuestion({
      type: e.target.value,
      options: [],
      correctAnswers: [],
    });
  };

  const addOption = () => {
    const newOption = `Option ${editedQuestion.options.length + 1}`;
    updateQuestion({ options: [...editedQuestion.options, newOption] });
  };

  const editOption = (index, newText) => {
    const updatedOptions = editedQuestion.options.map((opt, i) => (i === index ? newText : opt));

    let updatedCorrectAnswers = editedQuestion.correctAnswers;

    if (updatedCorrectAnswers.includes(editedQuestion.options[index])) {
      updatedCorrectAnswers = updatedCorrectAnswers.map((ans) => (ans === editedQuestion.options[index] ? newText : ans));
    }

    updateQuestion({
      options: updatedOptions,
      correctAnswers: updatedCorrectAnswers,
    });
  };

  const deleteOption = (index) => {
    const deletedOption = editedQuestion.options[index];

    const updatedOptions = editedQuestion.options.filter((_, i) => i !== index);

    const updatedCorrectAnswers = editedQuestion.correctAnswers.filter((ans) => ans !== deletedOption);

    updateQuestion({
      options: updatedOptions,
      correctAnswers: updatedCorrectAnswers,
    });
  };

  const toggleCorrectAnswer = (option) => {
    let updatedCorrectAnswers;
    if (editedQuestion.correctAnswers.includes(option)) {
      updatedCorrectAnswers = editedQuestion.correctAnswers.filter((ans) => ans !== option);
    } else {
      updatedCorrectAnswers = editedQuestion.type === 'multiple-choice' ? [option] : [...editedQuestion.correctAnswers, option];
    }
    updateQuestion({ correctAnswers: updatedCorrectAnswers });
  };

  const handleCorrectAnswerChange = (e) => {
    updateQuestion({ correctAnswers: [e.target.value] });
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>Question {question.index + 1}</h3>
        <button className="active-btn" onClick={() => onActive(question)}>✔ Activate</button>
      </div>
  
      {/* Input para editar el texto de la pregunta */}
      <input 
        type="text" 
        className="question-input"
        value={editedQuestion.text} 
        onChange={handleQuestionTextChange} 
        placeholder="Enter question..." 
      />
  
      {/* Selector de tipo de pregunta */}
      <select className="question-select" value={editedQuestion.type} onChange={handleTypeChange}>
        <option value="short-answer">Short Answer</option>
        <option value="multiple-choice">Multiple Choice</option>
        <option value="multiple-selection">Multiple Selection</option>
      </select>
  
      {/* Respuesta correcta para "short-answer" */}
      {editedQuestion.type === 'short-answer' && (
        <div className="correct-answer">
          <label>Correct Answer: </label>
          <input
            type="text"
            className="correct-answer-input"
            value={editedQuestion.correctAnswers[0] || ''}
            onChange={handleCorrectAnswerChange}
            placeholder="Enter correct answer..."
          />
        </div>
      )}
  
      {/* Opciones de respuesta */}
      {(editedQuestion.type === 'multiple-choice' || editedQuestion.type === 'multiple-selection') && (
        <div className="options">
          {editedQuestion.options.map((option, index) => (
            <div key={index} className="option-item">
              {/* Editar opción */}
              <input 
                type="text" 
                className="option-input"
                value={option} 
                onChange={(e) => editOption(index, e.target.value)} 
              />
              {/* Seleccionar respuesta correcta */}
              <input
                type={editedQuestion.type === 'multiple-choice' ? 'radio' : 'checkbox'}
                checked={editedQuestion.correctAnswers.includes(option)}
                onChange={() => toggleCorrectAnswer(option)}
              />
              {/* Eliminar opción */}
              <button className="delete-option-btn" onClick={() => deleteOption(index)}>🗑</button>
            </div>
          ))}
          <button className="add-option-btn" onClick={addOption}>➕ Add Option</button>
        </div>
      )}
  
      {/* Botón para eliminar la pregunta */}
      <button className="delete-btn" onClick={() => onDelete(editedQuestion.id)}>🗑 Delete Question</button>
    </div>
  );
  
});
