import {combineReducers} from 'redux'
import { ProfileReducer } from './profileReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    profile: ProfileReducer,
})

export type RootState = ReturnType<typeof rootReducer>