import { createSlice } from "@reduxjs/toolkit";

const initialNoteInfo = {
  title: "",
  note: "",
  imageUrl: null,
};

const initialState = {
  noteInfo: initialNoteInfo,
};

const addNoteSlice = createSlice({
  name: "addNote",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.noteInfo.title = action.payload;
    },
    setNote(state, action) {
      state.noteInfo.note = action.payload;
    },
    setImageUrl(state, action) {
      state.noteInfo.imageUrl = action.payload;
    },
    resetAddNoteState(state) {
      state.noteInfo = initialNoteInfo;
    },
    editNote(state, action) {
      state.noteInfo = action.payload;
    },
  },
});

export const { setTitle, setNote, setImageUrl, resetAddNoteState, editNote } =
  addNoteSlice.actions;

export const selectAddNote = (state) => state.addNote.noteInfo;

export default addNoteSlice.reducer;