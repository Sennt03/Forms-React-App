import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.questions = action.payload
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload)
    },
    updateQuestion: (state, action) => {
      const { id, data } = action.payload
      const index = state.questions.findIndex((q) => q.id === id)
      if (index !== -1) state.questions[index] = { ...state.questions[index], ...data }
    },
  },
});

export const { setForm, addQuestion, updateQuestion } = formSlice.actions
export default formSlice.reducer