import { UserAction, UserActionType } from "../types/users"
import { Dispatch } from "redux"
import storage from "../../../storage"
import axios from "../../axios/axios"

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCH_USERS})
            await storage.load({
                key: 'token'
            })
            .then(res => {
                axios.get('/users/getAll', {headers: {Authorization: `Bearer ${res.accessToken}`}})
                .then(({data}) => {
                    console.log(data);
                    dispatch({type: UserActionType.FETCH_USERS_SUCCESS, payload: data})
                })
            })
        }  catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка загрузки пользователей'})
        }
    }
}

export const getOneUser = (id: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCh_USER_GET_ONE, payload: id})
        } catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка при получение информации о пользоателе'})
        }
    }
}

export const getNewUserlist = (data: any) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionType.FETCH_USERS})
            dispatch({type: UserActionType.FETCH_USERS_SUCCESS, payload: data})
        } catch {
            dispatch({type: UserActionType.FETCH_USERS_ERROR, payload: 'Ошибка в получение нового списка пользователей'})
        }
    }
}