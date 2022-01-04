import axios from "axios"
import constants from "../constants"
import apiGetAllEvents from "../../api/apiEvents/apiGetAllEvents.js"
import apiGetEvent from "../../api/apiEvents/apiGetEvent"
import apiPostEvent from "../../api/apiEvents/apiPostEvent"
import getAllTypes from "../../api/apiEvents/apiGetAllTypes"
import getUserEvent from "../../api/apiEvents/apiGetUserEvent"
import apiGetUserEvent from "../../api/apiEvents/apiGetUserEvent"
import apiGetUser from "../../api/apiEvents/apiGetUser"
import apiDeleteEvent from "../../api/apiEvents/apiDeleteEvent"

export const getAllEvents = () => dispatch => {
  dispatch({ type: constants.GET_ALL_EVENTS_LOADING })
  axios
    .get(apiGetAllEvents)
    .then(({ data }) => {
      dispatch({ type: constants.GET_ALL_EVENTS_SUCCESS, payload: data.events })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: constants.GET_ALL_EVENTS_FAILED })
    })
}

export const getEvent = id => dispatch => {
  dispatch({ type: constants.GET_EVENT_LOADING })
  axios
    .get(`${apiGetEvent}/${id}`)
    .then(({ data }) => {
      dispatch({ type: constants.GET_EVENT_SUCCESS, payload: data.event })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: constants.GET_EVENT_FAILED })
    })
}
export const getUserEvents = () => dispatch => {
  dispatch({ type: constants.GET_USER_EVENT_LOADING })
  axios
    .get(apiGetUserEvent, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") || localStorage.getItem("google")
        }`,
      },
    })
    .then(({ data }) => {
      dispatch({ type: constants.GET_USER_EVENT_SUCCESS, payload: data.events })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: constants.GET_USER_EVENT_FAILED })
    })
}
export const postEvent = data => dispatch => {
  dispatch({ type: constants.POST_EVENT_LOADING })
  axios
    .post(apiPostEvent, data, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") || localStorage.getItem("google")
        }`,
      },
    })
    .then(({ data }) => {
      dispatch({ type: constants.POST_EVENT_SUCCESS, payload: data.events })
    })
    .then(() => {
      setTimeout(() => {
        dispatch({ type: constants.RESET_POST_EVENT })
      }, 2000)
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: constants.POST_EVENT_FAILED })
    })
    .catch(() => {
      setTimeout(() => {
        dispatch({ type: constants.RESET_POST_EVENT })
      }, 2000)
    })
}
export const getViews = () => {
  return dispatch => {
    dispatch({ type: constants.GET_VIEWS_LOADING })
    dispatch({ type: constants.GET_VIEWS })
  }
}

export const getTypes = () => {
  return async dispatch => {
    dispatch({ type: constants.GET_ALL_TYPES_LOADING })
    try {
      const response = await axios.get(getAllTypes)
      dispatch({
        type: constants.GET_ALL_TYPES_SUCCESS,
        payload: response.data.types,
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}

export const getUser = id => dispatch => {
  dispatch({ type: constants.GET_USER_LOADING })
  axios
    .get(`${apiGetUser}/${id}`)
    .then(({ data }) => {
      dispatch({ type: constants.GET_USER_SUCCESS, payload: data })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: constants.GET_USER_FAILED })
    })
}

export const showDeleteEvent = event => {
  return dispatch =>
    dispatch({ type: constants.SHOW_DELETE_EVENT, payload: event })
}
export const hideDeleteEvent = () => {
  return dispatch => dispatch({ type: constants.HIDE_DELETE_EVENT })
}

export const deleteUserEvent = obj => {
  return async dispatch => {
    dispatch({ type: constants.DELETE_EVENT_LOADING, payload: obj })
    dispatch({ type: constants.HIDE_DELETE_EVENT })
    try {
      const response = await axios.delete(`${apiDeleteEvent}/${obj._id}`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("google") || localStorage.getItem("token")
          }`,
        },
      })
      dispatch({
        type: constants.DELETE_EVENT_SUCCESS,
        payload: response.data.allEvents,
      })
      dispatch({
        type: constants.GET_USER_EVENT_SUCCESS,
        payload: response.data.userEvents,
      })
    } catch (e) {
      dispatch({ type: constants.DELETE_EVENT_FAILED })
    }
  }
}

export const setInputValue = value => {
  return dispatch => dispatch({ type: constants.SEARCH_EVENT, payload: value })
}
