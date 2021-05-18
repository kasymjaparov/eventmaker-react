import constants from '../constants.js'
import {getAllEvents} from '../actions/events'

const initialState = {
    allEvents: [],
    getAllEvents: {
        loading: false,
        success: false,
        failed: false,
        getViews: false
    },
    searchEvent:'',
    types: [],
    getAllTypes: {
        success: false,
        loading: false,
        failed: false
    },
    event: {},
    eventState: {
        loading: false,
        success: false,
        failed: false
    },
    postEventState: {
        loading: false,
        success: false,
        failed: false
    },
    userEventState: {
        loading: false,
        success: false,
        failed: false
    },
    userEvents: [],
    getUserState: {
        loading: false,
        success: false,
        failed: false
    },
    deleteEventDisplay: 'none',
    deleteEvent: {
        success: false,
        loading: false,
        failed: false,
        event: {}
    },
    getUser: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                allEvents: action.payload,
                getAllEvents: {
                    success: true,
                    loading: false,
                    failed: false,
                    getViews: true
                }
            }
        case constants.GET_VIEWS:
            return {
                ...state,
                getAllEvents: {
                    success: true,
                    loading: false,
                    failed: false,
                    getViews: false
                }
            }
        case constants.GET_VIEWS_LOADING:
            return {
                ...state,
                getAllEvents: {
                    success: true,
                    loading: true,
                    failed: false,
                    getViews: true
                }
            }
        case constants.GET_ALL_EVENTS_LOADING:
            return {
                ...state,
                getAllEvents: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.GET_ALL_EVENTS_FAILED:
            return {
                ...state,
                getAllEvents: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.GET_EVENT_SUCCESS:
            return {
                ...state,
                event: action.payload,
                eventState: {success: true, loading: false, failed: false}
            }
        case constants.GET_EVENT_LOADING:
            return {
                ...state,
                eventState: {success: false, loading: true, failed: false}
            }
        case constants.GET_EVENT_FAILED:
            return {
                ...state,
                eventState: {success: false, loading: false, failed: true}
            }
        case constants.GET_USER_EVENT_SUCCESS:
            return {
                ...state,
                userEventState: {success: true, loading: false, failed: false},
                userEvents: action.payload
            }
        case constants.GET_USER_EVENT_LOADING:
            return {
                ...state,
                userEventState: {success: false, loading: true, failed: false}
            }
        case constants.GET_USER_EVENT_FAILED:
            return {
                ...state,
                userEventState: {success: false, loading: false, failed: true}
            }
        case constants.POST_EVENT_SUCCESS:
            return {
                ...state,
                allEvents: action.payload,
                postEventState: {success: true, loading: false, failed: false}
            }
        case constants.POST_EVENT_LOADING:
            return {
                ...state,
                postEventState: {success: false, loading: true, failed: false}
            }
        case constants.POST_EVENT_FAILED:
            return {
                ...state,
                postEventState: {success: false, loading: false, failed: true}
            }
        case constants.RESET_POST_EVENT:
            return {
                ...state,
                postEventState: {success: false, loading: false, failed: false}
            }
        case constants.GET_ALL_TYPES_SUCCESS:
            return {
                ...state,
                types: action.payload,
                getAllTypes: {
                    success: true,
                    loading: false,
                    failed: false
                }
            }
        case constants.GET_ALL_TYPES_LOADING:
            return {
                ...state,
                getAllTypes: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.GET_ALL_TYPES_FAILED:
            return {
                ...state,
                getAllTypes: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }

        case constants.GET_USER_SUCCESS:
            return {
                ...state,
                getUserState: {
                    success: true,
                    loading: false,
                    failed: false
                },
                getUser: action.payload
            }
        case constants.GET_USER_LOADING:
            return {
                ...state,
                getUserState: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.GET_USER_FAILED:
            return {
                ...state,
                getUserState: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                deleteEvent: {
                    success: true,
                    loading: false,
                    failed: false,
                },
                allEvents: action.payload
            }
        case constants.DELETE_EVENT_LOADING:
            return {
                ...state,
                deleteEvent: {
                    success: false,
                    loading: true,
                    failed: false,
                    event: action.payload
                }
            }
        case constants.DELETE_EVENT_FAILED:
            return {
                ...state,
                deleteEvent: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.SHOW_DELETE_EVENT:
            return {
                ...state,
                deleteEventDisplay: 'block',
                deleteEvent: {
                    success: false,
                    loading: false,
                    failed: false,
                    event: action.payload
                }
            }
        case constants.HIDE_DELETE_EVENT:
            return {
                ...state,
                deleteEventDisplay: 'none',
            }
        case constants.SEARCH_EVENT:
            return {
                ...state,
                searchEvent: action.payload
            }
        default:
            return state
    }
}

export default reducer
