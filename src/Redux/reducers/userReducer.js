import { DELETE_USER, GET_ALL_USERS, UPDATE_USER} from '../types'

const inial={
    user:[]
}

const userReducer=(state=inial,action)=>{
    switch(action.type){
        case GET_ALL_USERS:
            return {
                ...state,
                user:action.payload,
            }
        case UPDATE_USER:
        return {
            ...state,
            user:action.payload,
        }
        case DELETE_USER:
            return {
                ...state,
                user:action.payload,
            }
        default:
            return state;
    }
}

export default userReducer