export interface UserState{
    users: any[],
    loading: boolean,
    error: null | string
}

export enum UserActionType {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    FETCh_USER_GET_ONE = 'FETCh_USER_GET_ONE', 
    FETCH_USER_SKIP = 'FETCH_USER_SKIP',
    FETCH_USER_LIKE = 'FETCH_USER_LIKE',
    FETCH_USER_DISLIKE = 'FETCH_USER_DISLIKE',
    FETCH_NEW_LIST = 'FETCH_NEW_LIST',
}

interface FetchUsersAction{
    type: UserActionType.FETCH_USERS
}

interface FetchUsersSuccessAction{
    type: UserActionType.FETCH_USERS_SUCCESS,
    payload: any[]
}

interface FetchUsersGetOnesAction{
    type: UserActionType.FETCh_USER_GET_ONE,
    payload: any
}

interface FetchUsersErrorsAction{
    type: UserActionType.FETCH_USERS_ERROR
    payload: string
}

interface FetchUserSkipAction{
    type: UserActionType.FETCH_USER_SKIP,
    payload: any,
}

interface FetchUserLikeAction{
    type: UserActionType.FETCH_USER_LIKE,
    payload: any,
}

interface FetchUserDislikeAction{
    type: UserActionType.FETCH_USER_DISLIKE
    payload: any
}

interface FetchUserNewListAction{
    type: UserActionType.FETCH_NEW_LIST,
    payload: any
}

export type UserAction = 
FetchUsersAction 
| FetchUsersSuccessAction 
| FetchUsersErrorsAction 
| FetchUserSkipAction
| FetchUserLikeAction
| FetchUserDislikeAction
| FetchUsersGetOnesAction
| FetchUserNewListAction