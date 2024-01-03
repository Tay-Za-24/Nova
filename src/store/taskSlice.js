import { createSlice } from '@reduxjs/toolkit';
import { updateTaskStatus } from '../services/taskService';

const initialState = {
  start: null,
  end: null,
  date : null,
  taskData: '',
  status : "unfinished",
  priority : 'Normal Priority'
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskStartTime: (state, action) => {
      state.start = action.payload;
      console.log(action.payload , " Done");
    },
    setTaskEndTime: (state, action) => {
      console.log(action.payload);
      state.end = action.payload;
    },
    setTaskData: (state, action) => {
      state.taskData = action.payload;
    },
    setPriority : (state, action) => {
      state.priority = action.payload;
      console.log(action.payload);
    },
    updateStatus : (state, payload) => {
      updateTaskStatus(payload.payload);
    },
    setDate : (state, action) => {
      console.log(action.payload);
      state.date = action.payload
    },
    resetTaskState: (state) => {
      state.start = initialState.start;
      state.end = initialState.end;
      state.taskData = initialState.taskData;
      state.status = initialState.status;
      state.date = initialState.date;
      state.priority = initialState.priority
    },
  },
});

export const { setTaskStartTime, setTaskEndTime, setTaskData, updateStatus, resetTaskState, getTaskData, setDate, setPriority } = taskSlice.actions;
export const selectTasks = (state) => state.tasks;

export default taskSlice.reducer;