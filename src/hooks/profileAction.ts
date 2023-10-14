import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProfileActionCreators from '../store/action-creators/profile'

export const profileAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ProfileActionCreators, dispatch)
}