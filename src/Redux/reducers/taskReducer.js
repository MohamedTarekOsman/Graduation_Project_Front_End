import {CREATE_TASK, DELETE_TASK, GET_ALL_TASKS,GET_ONE_TASK,UPDATE_TASK} from '../types'

const inial={
    task:[],
    createTask:[],
    oneTask:[],
    updateTask:[],
}

const taskReducer=(state=inial,action)=>{
    switch(action.type){
        case CREATE_TASK:
            return {
                ...state,
                createTask:action.payload,
            }
        case DELETE_TASK:
        return {
            ...state,
            task:action.payload,
        }
        case GET_ALL_TASKS:
        return {
            ...state,
            task:action.payload,
        }
        case GET_ONE_TASK:
        return {
            ...state,
            oneTask:action.payload,
        }
        case UPDATE_TASK:
        return {
            ...state,
            updateTask:action.payload,
        }
        case 'RESET_CREATE_TASK':
            return {
                ...state,
                createTask: [],
            };
        default:
            return state;
    }
}

export default taskReducer