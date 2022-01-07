import apiRegistration from '../../api/apiAuth/apiRegistration'
import apiLogin from '../../api/apiAuth/apiLogin'
import apiActivation from '../../api/apiAuth/apiActivation'
import apiInfo from '../../api/apiAuth/apiInfo'
import googleAuthApi from "../../api/apiAuth/googleAuthApi";
import axios from 'axios'
import constants from '../constants'
import getUsers from "../../api/apiAuth/apiGetAllUsers";
import apiUpdateInfo from "../../api/apiAuth/apiUpdateInfo"

export const auth = (data) => (dispatch) => {
    dispatch({type: constants.REGISTRATION_LOADING})
    axios
        .post(apiRegistration, data)
        .then(({data}) => {
            dispatch({type: constants.REGISTRATION_SUCCESS, payload: data.message})
        })
        .catch((err) => {
           
            dispatch({type: constants.REGISTRATION_FAILED, payload: err.message})
        })
}
export const login = (data) => (dispatch) => {
    dispatch({type: constants.LOGIN_LOADING})
    axios
        .post(apiLogin, data)
        .then(({data}) => {
            window.localStorage.setItem('token', data.token)
            dispatch({type: constants.LOGIN_SUCCESS, payload: data.token})
        })
        .catch((err) => {
            console.log(err)
            dispatch({type: constants.LOGIN_FAILED})
        })
}

export const verification = (token) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(apiActivation, {token})
            dispatch({type: constants.VERIFICATION_SUCCESS, payload: response.data.message})
        } catch (e) {
            dispatch({type: constants.VERIFICATION_FAILED, payload: e.data.message})
        }
    }
}
export const getUserInfo = (token) => (dispatch) => {
    dispatch({type: constants.GET_DATA_LOADING})
    axios
        .get(apiInfo, {headers: {Authorization: `Bearer ${token}`}})
        .then(({data}) => {
            dispatch({type: constants.GET_DATA_SUCCESS, payload: data})
        })
        .catch((err) => {
            dispatch({type: constants.GET_DATA_FAILED})
        })
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("token")
    dispatch({type: constants.LOGOUT})
}


export const googleAuth = (token) => {
    return async (dispatch) => {
        try {
            dispatch({type: constants.GOOGLE_AUTH_LOADING})
            const response = await axios.post(googleAuthApi, {token})
            dispatch({type: constants.GOOGLE_AUTH_SUCCESS, payload: response.data.newToken})
            localStorage.setItem('google', response.data.newToken)
        } catch (e) {
            dispatch({type: constants.GOOGLE_AUTH_FAILED})
        }

    }
}

export const googleLogout = () => {
    return (dispatch) => {
        dispatch({type: constants.GET_ALL_TYPES_LOADING})
        localStorage.removeItem('google')
        dispatch({type: constants.GOOGLE_LOGOUT})
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({type: constants.GET_ALL_USERS_LOADING})
            const response = await axios.get(getUsers)
            dispatch({type: constants.GET_ALL_USERS_SUCCESS, payload: response.data.users})
        } catch (e) {
            console.log(e.response.data)
        }
    }
}

export const updateUserInfo = (obj) => {
    return async (dispatch) => {
        try {
            dispatch({type: constants.UPDATE_USER_INFO_LOADING})
            const response = await axios.put(apiUpdateInfo, obj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('google') || localStorage.getItem('token')}`
                }
            })
            dispatch({type: constants.UPDATE_USER_INFO_SUCCESS, payload: response.data})
            setTimeout(() => {
                dispatch({type: constants.RESET_UPDATE_INFO})
            }, 2000)
        } catch (error) {
            console.log(error.response.data)
            dispatch({type: constants.UPDATE_USER_INFO_FAILED, payload: error.response.data})
            setTimeout(() => {
                dispatch({type: constants.RESET_UPDATE_INFO})
            }, 2000)
        }
    }
}

