import {CREATE_NOTE, DELETE_NOTE, GET_ALL_NOTES} from '../types'

const inial={
    notes:[]
}

const noteReducer=(state=inial,action)=>{
    switch(action.type){
        case GET_ALL_NOTES:
            return {
                ...state,
                notes:action.payload,
            }
        case CREATE_NOTE:
            return {
                ...state,
                notes:action.payload,
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes:action.payload,
            }
        default:
            return state;
    }
}

export default noteReducer