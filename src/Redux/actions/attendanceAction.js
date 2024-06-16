import { useGetDataToken } from "../../customHooks/useGetData"
import { useInsertData } from "../../customHooks/useInsertData"
import  useDeleteData  from "../../customHooks/useDeleteData"
import { useUpdateData } from "../../customHooks/useUpdateData"
import { CREATE_ATTENDANCE, DELETE_ATTENDANCE, GET_ALL_ATTENDANCES, GET_ERROR, GET_ONE_ATTENDANCE, UPDATE_ATTENDANCE } from "../types"

// get all attendances
export const getAllAttendance=()=>async(dispatch)=>{
    try{
        const response=await useGetDataToken('/attendance')
        dispatch({
            type:GET_ALL_ATTENDANCES,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//create attendance
export const createAttendance=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertData(`/attendance`,formData);
        dispatch({
            type:CREATE_ATTENDANCE,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get one Attendance with id
export const getOneAttendance=(id)=>async (dispatch)=>{
    try{
        const response=await useGetDataToken(`/attendance/${id}`);
        dispatch({
            type:GET_ONE_ATTENDANCE,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//delete Attendance with id
export const deleteAttendance=(id)=>async (dispatch)=>{
    try{
        const response=await useDeleteData(`/attendance/${id}`);
        dispatch({
            type:DELETE_ATTENDANCE,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//update Attendance with id
export const updateAttendance=(id,formdata)=>async (dispatch)=>{
    try{
        const response=await useUpdateData(`/attendance/${id}`,formdata);
        dispatch({
            type:UPDATE_ATTENDANCE,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}