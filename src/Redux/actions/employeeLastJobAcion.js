import { useInsertData } from "../../customHooks/useInsertData";
import { CREATE_EMPLOYEE_LAST_JOB, GET_ERROR } from "../types";




export const createEmployeeLastJob=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertData(`/employeeLastJob`,formData);
        dispatch({
            type:CREATE_EMPLOYEE_LAST_JOB,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}
