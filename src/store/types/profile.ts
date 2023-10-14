import { UserType } from "../../types/user.type"

export interface ProfileState{
    user: UserType | any,
    loading: boolean,
    error: null | string
}

export enum ProfileActionType {
    FETCH_PROFILE = 'FETCH_PROFILE',
    FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
    FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR',
}

interface FetchProfileAction{
    type: ProfileActionType.FETCH_PROFILE
}

interface FetchProfileSuccessAction{
    type: ProfileActionType.FETCH_PROFILE_SUCCESS,
    payload: any
}

interface FetchProfileErrorsAction{
    type: ProfileActionType.FETCH_PROFILE_ERROR
    payload: string
}


export type ProfileAction = 
FetchProfileAction 
| FetchProfileSuccessAction 
| FetchProfileErrorsAction 