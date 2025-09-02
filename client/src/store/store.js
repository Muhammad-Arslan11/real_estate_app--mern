import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import {persistReducer, presistStore} from 'redux-persist';
import {storage} from '@redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer});
const persistConfig = {
    key: 'root',
    storage,
    verison: 1,
}

const persistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = presistStore(store);