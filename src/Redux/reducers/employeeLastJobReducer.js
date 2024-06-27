import {CREATE_EMPLOYEE_LAST_JOB, DELETE_EMPLOYEE_LAST_JOB, GET_ALL_EMPLOYEE_LAST_JOB, UPDATE_EMPLOYEE_LAST_JOB} from '../types'

const inial={
    emplyeeLastJob:[],
}

const employeeLastJobReducer=(state=inial,action)=>{
    switch(action.type){
        case CREATE_EMPLOYEE_LAST_JOB:
            return {
                ...state,
                emplyeeLastJob:action.payload,
            }
        case GET_ALL_EMPLOYEE_LAST_JOB:
            return {
            ...state,
            emplyeeLastJob:action.payload,
            }
        case DELETE_EMPLOYEE_LAST_JOB:
            return {
            ...state,
            emplyeeLastJob:action.payload,
            }
        case UPDATE_EMPLOYEE_LAST_JOB:
            return {
            ...state,
            emplyeeLastJob:action.payload,
            }
        default:
            return state;
    }
}

export default employeeLastJobReducer