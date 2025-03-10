// FormPage.jsx
import { useCallback, useState } from 'react';
import { Question, Header, Sidebar } from '../components';
import './Form.css'

export const FormPage = () => {
  const [form, setForm] = useState({
    title: '',
    date: new Date().toISOString(),
    published: false,
    questions: [
      {
        id: new Date().getTime(),
        index: 0,
        text: '',
        type: 'short-answer',
        options: [],
        correctAnswers: [],
        isActive: false
      }
    ]
  });

  const onUpdate = useCallback((question) => {
    setForm((prevForm) => {
      const index = prevForm.questions.findIndex((q) => q.id === question.id);
      if (index < 0) return prevForm;

      const updatedQuestions = [...prevForm.questions];
      updatedQuestions[index] = question;

      return { ...prevForm, questions: updatedQuestions };
    });
  }, []);

  const validateQuestion = (question) => {
    if (!question.text || question.text.trim() === '') {
      return 'Question text cannot be empty';
    }
  
    if (question.type === 'short-answer') {
      if (!question.correctAnswers || question.correctAnswers.length === 0 || question.correctAnswers[0].trim() === '') {
        return 'A correct answer must be provided for short answer questions';
      }
    }
  
    if (question.type === 'multiple-choice' || question.type === 'multiple-selection') {
      if (question.options.length === 0) {
        return 'At least one option must be provided for multiple choice or multiple selection questions';
      }
  
      for (let option of question.options) {
        if (!option || option.trim() === '') {
          return 'Options cannot be empty';
        }
      }
  
      if (question.type === 'multiple-choice' && question.correctAnswers.length === 0) {
        return 'At least one correct answer must be selected for multiple choice questions';
      }
  
      if (question.type === 'multiple-selection' && question.correctAnswers.length === 0) {
        return 'At least one correct answer must be selected for multiple selection questions';
      }
    }
  
    return null;
  };  

  const onActive = useCallback((question) => {
    setForm((prevForm) => {
      const index = prevForm.questions.findIndex((q) => q.id === question.id);
      if (index < 0) return prevForm;

      const qValidate = prevForm.questions[index];
      const validate = validateQuestion(qValidate);
      if (validate != null) {
        alert(validate);
        return prevForm;
      }

      const updatedQuestions = [...prevForm.questions];
      const newQuestion = { ...updatedQuestions[index], isActive: true };
      updatedQuestions[index] = newQuestion;

      return { ...prevForm, questions: updatedQuestions };
    });
  }, []);

  const onDelete = useCallback((question) => {
    setForm((prevForm) => {
      const index = prevForm.questions.findIndex((q) => q.id === question);
      if (index < 0) return prevForm;

      const updatedQuestions = prevForm.questions.filter((q) => q.id !== question);
      setQuestion(null)
      
      return { ...prevForm, questions: updatedQuestions };
    });
  }, []);

  const handleSave = useCallback(() => {
    setForm(prevForm => {
      prevForm.questions.forEach(question => {
        if(!question.isActive){
          alert('All questions must be active to save')
          return prevForm
        }
      });

      console.log('guardando')
      return prevForm
    })
  }, []);

  const handleTitleChange = (e) => {
    setForm({
      ...form,
      title: e.target.value
    });
  };

  const handlePublic = () => {
    setForm({
      ...form,
      published: !form.published
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: new Date().getTime(),
      index: form.questions.length,
      text: '',
      type: 'short-answer',
      options: [],
      correctAnswers: [],
      isActive: false
    };
    setForm({
      ...form,
      questions: [...form.questions, newQuestion]
    });
  };

  const [question, setQuestion] = useState();

  const handleRenderQuestion = (id_question, index) => {
    const question = form.questions.find(q => q.id == id_question);
    question['index'] = index;
    setQuestion(question);
  };

  return (
    <>
      <Sidebar
        questions={form.questions} 
        onRenderQuestion={handleRenderQuestion} 
        addQuestion={addQuestion}
      />

      <section className="home-section">
        <Header 
          title={form.title} 
          handleTitleChange={handleTitleChange} 
          handlePublic={handlePublic} 
          handleSave={handleSave} 
          published={form.published} 
        />

        {
          question ? <Question key={question.id} 
            question={question} 
            onUpdate={onUpdate} 
            onDelete={onDelete} 
            onActive={onActive}
          /> : (<p className='select-text'>Select a question</p>)
        }
      </section>
    </>
  );
};
