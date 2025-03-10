import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Play.css"
import useFetchOne from "../../infra/services/useFetchOne"
import { Loading } from "../../shared/components/Loading"

export const PlayPage = () => {
  const { formId } = useParams()
  const { form, loading, error } = useFetchOne(formId)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate();
  const [score, setScore] = useState(0) // Almacena el puntaje total

  if (loading) return <Loading show={true} />
  if (error || !form) return <div className="error">Error loading form</div>

  const questions = form.questions
  const currentQuestion = questions[currentQuestionIndex]

  const cleanText = (text) => {
    // Limpia el texto: convierte a minúsculas, elimina espacios y caracteres no alfanuméricos
    return text.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
  }

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
    setErrorMsg("")
  }

  const handleNext = () => {
    if (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) {
      setErrorMsg("You must select or enter an answer")
      return
    }

    // Compara la respuesta del usuario con la respuesta correcta
    if (currentQuestion.type === "short-answer") {
      const cleanedAnswer = cleanText(answers[currentQuestion.id])
      const cleanedCorrectAnswer = cleanText(currentQuestion.correctAnswers[0])
      
      if (cleanedAnswer === cleanedCorrectAnswer) {
        setScore((prev) => prev + 1) // Aumenta el puntaje si la respuesta es correcta
      }
    } else if (currentQuestion.type === "multiple-choice" || currentQuestion.type === "multiple-selection") {
      // Para opción múltiple o selección múltiple, validamos las respuestas
      let userAnswers = answers[currentQuestion.id] || []
      const correctAnswers = currentQuestion.correctAnswers || []

      if(currentQuestion.type === "multiple-choice") userAnswers = [userAnswers]
      
      if (userAnswers.length === correctAnswers.length && userAnswers.every(answer => correctAnswers.includes(answer))) {
        setScore((prev) => prev + 1) // Aumenta el puntaje si las respuestas son correctas
      }
    }

    // Si no es la última pregunta, avanza a la siguiente
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      Swal.fire({
        title: `Finish! <b>Your score is ${score}</b> out of ${questions.length}`,
        icon: "info",
        html: `
          <strong>Thanks for test my app!</strong>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
          <i className="fa fa-thumbs-up"></i> Great!
        `,
        // cancelButtonAriaLabel: "Thumbs down"
      }).then((result) => {
        navigate('/');
      });

    }
  }

  return (
    <div className="play-form-container">
      <div className="question-card">
        <div className="back">
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>
        <h2 className="question-title">
          {currentQuestionIndex + 1}. {currentQuestion.text}
        </h2>
        <div className="question-options">
          {currentQuestion.type === "short-answer" && (
            <input
              type="text"
              className="input-answer"
              placeholder="Your answer..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          )}

          {(currentQuestion.type === "multiple-choice" || currentQuestion.type === "multiple-selection") && (
            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="option-item">
                  <input
                    type={currentQuestion.type === "multiple-choice" ? "radio" : "checkbox"}
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={(answers[currentQuestion.id] || []).includes(option)}
                    onChange={(e) => {
                      const value = e.target.value
                      if (currentQuestion.type === "multiple-choice") {
                        handleAnswerChange(value)
                      } else {
                        const newAnswers = answers[currentQuestion.id] ? [...answers[currentQuestion.id]] : []
                        if (newAnswers.includes(value)) {
                          handleAnswerChange(newAnswers.filter((ans) => ans !== value))
                        } else {
                          handleAnswerChange([...newAnswers, value])
                        }
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <button className="btn-next" onClick={handleNext}>
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  )
}
