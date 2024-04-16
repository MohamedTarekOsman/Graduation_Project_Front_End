import {GET_ALL_ATTENDANCES} from '../types'

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
        default:
            return state;
    }
}

export default attendanceReducer