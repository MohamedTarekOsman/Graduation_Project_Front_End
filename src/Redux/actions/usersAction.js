import useDeleteData from "../../customHooks/useDeleteData"
import { useGetDataToken } from "../../customHooks/useGetData"
import { useUpdateData } from "../../customHooks/useUpdateData"
import { DELETE_USER, GET_ALL_USERS, GET_ERROR, UPDATE_USER } from "../types"

//get all tasks
export const getAllUsers=()=>async (dispatch)=>{
    try{
        const response=await useGetDataToken(`/users`)
        dispatch({
            type:GET_ALL_USERS,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}
export const updateUser=(id,formdata)=>async(dispatch)=>{
    try{
        const response=await useUpdateData(`/users/${id}`,formdata);
        dispatch({
            type:UPDATE_USER,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}
export const deleteUser=(id)=>async(dispatch)=>{
    try{
        const response=await useDeleteData(`/users/${id}`)
        dispatch({
            type:DELETE_USER,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}