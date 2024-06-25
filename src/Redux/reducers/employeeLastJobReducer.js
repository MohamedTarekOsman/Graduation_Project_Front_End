import {CREATE_EMPLOYEE_LAST_JOB} from '../types'

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
        default:
            return state;
    }
}

export default employeeLastJobReducer