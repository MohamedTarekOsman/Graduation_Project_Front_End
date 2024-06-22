import {CREATE_ATTENDANCE, GET_ALL_ATTENDANCES, GET_ONE_ATTENDANCE} from '../types'

const inial={
    attendances:[]
}

const attendanceReducer=(state=inial,action)=>{
    switch(action.type){
        case GET_ALL_ATTENDANCES:
            return {
                ...state,
                attendances:action.payload,
            }
        case CREATE_ATTENDANCE:
            return {
                ...state,
                attendances:action.payload,
            }
        case GET_ONE_ATTENDANCE:
            return {
                ...state,
                attendances:action.payload,
            }
        default:
            return state;
    }
}

export default attendanceReducer