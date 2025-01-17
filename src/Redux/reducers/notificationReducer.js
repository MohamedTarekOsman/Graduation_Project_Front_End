import {CREATE_NOTIFICATIONS, DELETE_NOTIFICATIONS, GET_ALL_NOTIFICATIONS} from '../types'

const inial={
    notification:[]
}

const notificationReducer=(state=inial,action)=>{
    switch(action.type){
        case GET_ALL_NOTIFICATIONS:
            return {
                ...state,
                notification:action.payload,
            }
        case CREATE_NOTIFICATIONS:
            return {
                ...state,
                notification:action.payload,
            }
        case DELETE_NOTIFICATIONS:
        return {
            ...state,
            notification:action.payload,
        }
        default:
            return state;
    }
}

export default notificationReducer