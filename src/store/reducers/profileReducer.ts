import {ProfileAction, ProfileActionType, ProfileState} from '../types/profile'

const initialState: ProfileState = {
    user: {},
    loading: false,
    error: null
}

export const ProfileReducer = (state = initialState, action: ProfileAction): ProfileState => {
    switch(action.type){
        case ProfileActionType.FETCH_PROFILE:
            return {loading: true, error: null, user: {}}
        case ProfileActionType.FETCH_PROFILE_SUCCESS:
            return {loading: false, error: null, user: action.payload}
        case ProfileActionType.FETCH_PROFILE_ERROR:
            return {loading: false, error: action.payload, user: {}}
        default: 
            return state
    }
}