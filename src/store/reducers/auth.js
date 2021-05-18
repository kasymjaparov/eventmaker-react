import constants from '../constants.js'
import {updateUserInfo} from "../actions/auth";

const initialState = {
    userData: {},
    get: {
        success: false,
        loading: false,
        failed: false
    },
    login: {
        success: false,
        loading: false,
        failed: false
    },
    googleLogin: {
        success: false,
        loading: false,
        failed: false,
        token: ''
    },
    registration: {
        success: false,
        loading: false,
        failed: false,
        message: ''
    },
    verification: {
        success: false,
        loading: false,
        failed: false,
        message: ''
    },
    tokenLogin: '',
    getAllUsers: {
        success: false,
        loading: false,
        failed: false,
    },
    allUsers: [],
    updateUserInfo: {
        success: false,
        loading: false,
        failed: false,
        message: ''
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                get: {
                    success: true,
                    loading: false,
                    failed: false
                }
            }
        case constants.GET_DATA_LOADING:
            return {
                ...state,
                get: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.GET_DATA_FAILED:
            return {
                ...state,
                get: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.GOOGLE_AUTH_SUCCESS: {
            return {
                ...state,
                googleLogin: {
                    success: true,
                    loading: false,
                    failed: false,
                    token: action.payload
                }
            }
        }
        case constants.GOOGLE_AUTH_LOADING: {
            return {
                ...state,
                googleLogin: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        }
        case constants.GOOGLE_AUTH_FAILED: {
            return {
                ...state,
                googleLogin: {
                    success: false,
                    loading: false,
                    failed: true,
                    token: ''
                }
            }
        }
        case constants.LOGIN_FAILED:
            return {
                ...state,
                login: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.LOGIN_LOADING:
            return {
                ...state,
                login: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.LOGIN_SUCCESS:
            return {
                ...state,
                tokenLogin: action.payload,
                login: {
                    success: true,
                    loading: false,
                    failed: false
                },
                registration: {
                    success: false,
                    loading: false,
                    failed: false
                }
            }
        case constants.LOGOUT:
            return {
                ...state,
                userData: {},
                get: {
                    success: false,
                    loading: false,
                    failed: false
                },
                login: {
                    success: false,
                    loading: false,
                    failed: false
                },
                registration: {
                    success: false,
                    loading: false,
                    failed: false
                },
                token: ''
            }
        case constants.REGISTRATION_LOADING:
            return {
                ...state,
                registration: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.REGISTRATION_SUCCESS:
            return {
                ...state,
                registration: {
                    success: true,
                    loading: false,
                    failed: false,
                    message: action.payload
                },
                login: {
                    success: false,
                    loading: false,
                    failed: false
                }
            }
        case constants.REGISTRATION_FAILED:
            return {
                ...state,
                registration: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.VERIFICATION_LOADING:
            return {
                ...state,
                verification: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.VERIFICATION_SUCCESS:
            return {
                ...state,
                verification: {
                    success: true,
                    loading: false,
                    failed: false,
                    message: action.payload
                }
            }
        case constants.VERIFICATION_FAILED:
            return {
                ...state,
                verification: {
                    success: false,
                    loading: false,
                    failed: true,
                    message: action.payload
                }
            }
        case constants.LOGOUT:
            return {
                ...state,
                userData: {},
                get: {
                    success: false,
                    loading: false,
                    failed: false
                },
                login: {
                    success: false,
                    loading: false,
                    failed: false
                },
                registration: {
                    success: false,
                    loading: false,
                    failed: false,
                    message: ''
                },
                verification: {
                    success: false,
                    loading: false,
                    failed: false,
                    message: ''
                },
                tokenLogin: ''
            }
        case constants.GOOGLE_LOGOUT:
            return {
                ...state,
                userData: {},
                get: {
                    success: false,
                    loading: false,
                    failed: false
                },
                login: {
                    success: false,
                    loading: false,
                    failed: false
                },
                googleLogin: {
                    success: false,
                    loading: false,
                    failed: false,
                    token: ''
                },
                registration: {
                    success: false,
                    loading: false,
                    failed: false,
                    message: ''
                },
                verification: {
                    success: false,
                    loading: false,
                    failed: false,
                    message: ''
                },
                tokenLogin: ''
            }
        case constants.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                getAllUsers: {
                    success: true,
                    loading: false,
                    failed: false
                }, allUsers: action.payload

            }
        case constants.GET_ALL_USERS_LOADING:
            return {
                ...state,
                getAllUsers: {
                    success: false,
                    loading: true,
                    failed: false
                }
            }
        case constants.GET_ALL_USERS_FAILED:
            return {
                ...state,
                getAllUsers: {
                    success: false,
                    loading: false,
                    failed: true
                }
            }
        case constants.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state, updateUserInfo: {
                    success: true,
                    loading: false,
                    failed: false,
                    message: action.payload.message
                },
                userData: {
                    email: state.userData.email,
                    username: state.userData.username,
                    phone: action.payload.phone,
                    site: action.payload.site,
                    name: action.payload.name,
                    events: state.userData.events
                }
            }
        case constants.UPDATE_USER_INFO_LOADING:
            return {
                ...state, updateUserInfo: {
                    success: false,
                    loading: true,
                    failed: false,
                }
            }
        case constants.UPDATE_USER_INFO_FAILED:
            return {
                ...state, updateUserInfo: {
                    success: false,
                    loading: false,
                    failed: true,
                    message: action.payload
                }
            }
        case constants.RESET_UPDATE_INFO:
            return {
                ...state,
                updateUserInfo: {
                    success: false,
                    loading: false,
                    failed: false
                }
            }

        default:
            return state
    }
}

export default reducer
