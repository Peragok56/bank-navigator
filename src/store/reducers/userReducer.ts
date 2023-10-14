import { UserAction, UserActionType, UserState } from "../types/users"
import {IUserType} from '../types/../../types/user.type'

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}


export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type){
        case UserActionType.FETCH_USERS:
            return {loading: true, error: null, users: []}
        case UserActionType.FETCH_USERS_SUCCESS:
                return {loading: false, error: null, users: action.payload}
        case UserActionType.FETCh_USER_GET_ONE:
            return {loading: false, error: null, users: state.users.filter(user => user.id === action.payload)}
        case UserActionType.FETCH_USERS_ERROR:
            return {loading: false, error: action.payload, users: []}
        case UserActionType.FETCH_USER_SKIP:
            return {loading: false, error: null, users: state.users.filter(user => user.id !== action.payload)}
        case UserActionType.FETCH_USER_LIKE:
            return {loading: false, error: null, users: state.users.filter(user => user.id !== action.payload)}
        case UserActionType.FETCH_USER_DISLIKE:
            return {loading: false, error: null, users: state.users.filter(user => user.id !== action.payload)}
        default: 
            return state
    }
}