import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // Importamos useParams
import { Question, Header, Sidebar } from '../components'
import './Form.css'
import useSaveForm from '../../../infra/services/useSaveForm'
import { Loading } from '../../../shared/components/Loading'
import useFetchOne from '../../../infra/services/useFetchOne'
import useEditForm from '../../../infra/services/useEditForm'
import { validateQuestion } from '../helpers/validations'

export const FormPage = () => {
  const { formId } = useParams() // Obtenemos el formId de la URL
  const { editForm, loading: editLoading, error: editError, success: editSuccess } = useEditForm()

  const [form, setForm] = useState({
    title: '',
    published: true,
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
  })

  const navigate = useNavigate()
  const { form: data, loading: fetchLoading, error: fetchError } = useFetchOne(formId)

  useEffect(() => {
    if(fetchError){
      if (fetchError) {
        navigate('/create')
      }
    }

    if (formId && data) {
      setForm({
        title: data.title,
        published: data.published,
        questions: data.questions
      })
    }
  }, [formId, data, fetchError])
  

  const onUpdate = useCallback((question) => {
    setForm((prevForm) => {
      const index = prevForm.questions.findIndex((q) => q.id === question.id)
      if (index < 0) return prevForm

      const updatedQuestions = [...prevForm.questions]
      const newQuestion = { ...question, isActive: false }
      updatedQuestions[index] = newQuestion

      return { ...prevForm, questions: updatedQuestions }
    })
  }, [])

  const onActive = useCallback((question) => {
    setForm((prevForm) => {
      const index = prevForm.questions.findIndex((q) => q.id === question.id)
      if (index < 0) return prevForm
      
      const qValidate = prevForm.questions[index]
      const validate = validateQuestion(qValidate)
      if (validate != null) {
        toastr.error(validate)
        return prevForm
      }

      const updatedQuestions = [...prevForm.questions]
      const newQuestion = { ...updatedQuestions[index], isActive: true }
      updatedQuestions[index] = newQuestion

      toastr.success('Activated')

      return { ...prevForm, questions: updatedQuestions }
    })
  }, [])

  const onDelete = useCallback((question) => {
    setForm((prevForm) => {
      const index = prevForm.questions.findIndex((q) => q.id === question)
      if (index < 0) return prevForm

      const updatedQuestions = prevForm.questions.filter((q) => q.id !== question)
      setQuestion(null)

      return { ...prevForm, questions: updatedQuestions }
    })
  }, [])

  const { saveForm, loading, error, success } = useSaveForm()

  const handleSave = useCallback(() => {
    setForm((prevForm) => {
      let errorValidate = false
      prevForm.questions.forEach((question) => {
        if (!question.isActive) {
          toastr.error('All questions must be active to save')
          errorValidate = true
          return prevForm
        }
      })

      if(errorValidate){
        return prevForm
      }

      if (prevForm.title.trim() === '') {
        toastr.error('Title is required')
        return prevForm
      }

      if (prevForm.questions.length <= 0) {
        toastr.error('At least 1 question is required')
        return prevForm
      }

      if (formId) {
        editForm(formId, prevForm)
      } else {
        saveForm(prevForm)
      }

      return prevForm
    })
  }, [formId, saveForm])


  useEffect(() => {
    if (success) {
      toastr.success('Form saved successfully!')
      navigate('/')
    }

    if (error) {
      toastr.error('Error saving form: ' + error.message)
    }

    if (editError) {
      toastr.error('Error saving form: ' + editError.message)
    }

    if (editSuccess) {
      toastr.success('Form saved successfully!')
      navigate('/')
    }
    
  }, [success, error, editSuccess, editError])

  const handleTitleChange = (e) => {
    setForm({
      ...form,
      title: e.target.value
    })
  }

  const handlePublic = () => {
    setForm({
      ...form,
      published: !form.published
    })
  }

  const addQuestion = () => {
    const newQuestion = {
      id: new Date().getTime(),
      index: form.questions.length,
      text: '',
      type: 'short-answer',
      options: [],
      correctAnswers: [],
      isActive: false
    }
    setForm({
      ...form,
      questions: [...form.questions, newQuestion]
    })
  }

  const [question, setQuestion] = useState()

  const handleRenderQuestion = (id_question, index) => {
    const question = form.questions.find(q => q.id === id_question)
    question['index'] = index
    setQuestion(question)
  }

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

      <Loading show={loading || (fetchLoading && formId) || (editLoading)} />
    </>
  )
}
