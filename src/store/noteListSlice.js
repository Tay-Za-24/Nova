import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noteList: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNoteList(state, action) {
      state.noteList = action.payload;
    },
    addNote(state, action) {
      state.noteList.push(action.payload);
    },
    deleteNote(state, action) {
      state.noteList = state.noteList.filter(note => note.id !== action.payload);
    },
  },
});

export const { setNoteList, addNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
