export const validateQuestion = (question) => {
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
