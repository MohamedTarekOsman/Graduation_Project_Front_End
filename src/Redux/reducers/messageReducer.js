import {CREATE_MESSAGE, DELETE_MESSAGES_BETWEEN_USERS, GET_ALL_MESSAGES} from '../types'

const inial={
    message:[],
}

const messageReducer=(state=inial,action)=>{
    switch(action.type){
        case CREATE_MESSAGE:
            return {
                ...state,
                message:action.payload,
            }
        case GET_ALL_MESSAGES:
            return {
                ...state,
                message:action.payload,
            }
        case DELETE_MESSAGES_BETWEEN_USERS:
            return {
                ...state,
                message:action.payload,
            }
        default:
            return state;
    }
}

export default messageReducer