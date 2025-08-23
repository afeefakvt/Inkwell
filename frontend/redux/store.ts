import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore } from "redux-persist";
import userAuthReducer from './userSlice';


const persistConfig = {
    key:"auth",
    storage
}

const persistedUserAuthReducer = persistReducer(persistConfig,userAuthReducer);


export const store = configureStore({
    reducer:{
        auth:persistedUserAuthReducer
    }
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;