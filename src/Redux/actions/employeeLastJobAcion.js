import useDeleteData from "../../customHooks/useDeleteData";
import { useGetDataToken } from "../../customHooks/useGetData";
import { useInsertData } from "../../customHooks/useInsertData";
import { useUpdateData } from "../../customHooks/useUpdateData";
import { CREATE_EMPLOYEE_LAST_JOB, DELETE_EMPLOYEE_LAST_JOB, GET_ALL_EMPLOYEE_LAST_JOB, GET_ERROR, UPDATE_EMPLOYEE_LAST_JOB } from "../types";




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

//get all tasks
export const getAllEmployeeLastJobs=()=>async (dispatch)=>{
    try{
        const response=await useGetDataToken(`/employeeLastJob`)
        dispatch({
            type:GET_ALL_EMPLOYEE_LAST_JOB,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//delete task with id
export const deleteEmployeeLastJob=(code)=>async (dispatch)=>{
    try{
        const response=await useDeleteData(`/employeeLastJob/${code}`);
        dispatch({
            type:DELETE_EMPLOYEE_LAST_JOB,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//update task with id
export const updateEmployeeLastJob=(id,formdata)=>async (dispatch)=>{
    try{
        const response=await useUpdateData(`/employeeLastJob/${id}`,formdata);
        dispatch({
            type:UPDATE_EMPLOYEE_LAST_JOB,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}