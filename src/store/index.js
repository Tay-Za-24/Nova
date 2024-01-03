import { configureStore, combineReducers} from '@reduxjs/toolkit'
import taskReducer from './taskSlice'
import addNoteReducer from './addNoteSlice';
import dateReducer from './dateSlice';
import userReducer from './userSlice'

const reducer = combineReducers({
    tasks : taskReducer,
    addNote: addNoteReducer,
    date : dateReducer,
    user : userReducer,
})

export const store = configureStore({
    reducer,
    middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware({
        thunk : {},
        serializableCheck:false
    })
})

