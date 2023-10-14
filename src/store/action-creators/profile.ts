import { ProfileAction, ProfileActionType } from '../types/profile'
import { Dispatch } from 'redux'
import axios from '../../axios/axios'
import storage from '../../../storage'

export const fetchProfile = () => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            dispatch({type: ProfileActionType.FETCH_PROFILE})
            await storage.load({
                key: 'token'
            })
            .then(res => {
                axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${res.accessToken}`}})
                .then(({data}) => {
                    dispatch({type: ProfileActionType.FETCH_PROFILE_SUCCESS, payload: data})
                })
            })
        } catch {
            dispatch({type: ProfileActionType.FETCH_PROFILE_ERROR, payload: 'Ошибка при загрузке профиля'})
        }
    }
}

export const setNewInfoForProfile = (data: any) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try{
            dispatch({type: ProfileActionType.FETCH_PROFILE})
            dispatch({type: ProfileActionType.FETCH_PROFILE_SUCCESS, payload: data})
        } catch {
            dispatch({type: ProfileActionType.FETCH_PROFILE_ERROR, payload: 'Ошибка при изменение данных пользователя'})
        }
    }
}