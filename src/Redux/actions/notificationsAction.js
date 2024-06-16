import useDeleteData from "../../customHooks/useDeleteData"
import { useGetDataToken} from "../../customHooks/useGetData"
import { useInsertData } from "../../customHooks/useInsertData"
import { CREATE_NOTIFICATIONS, DELETE_NOTIFICATIONS, GET_ALL_NOTIFICATIONS, GET_ERROR } from "../types"

export const getAllNotification=()=>async(dispatch)=>{
    try{
        const response=await useGetDataToken('/notification')
        dispatch({
            type:GET_ALL_NOTIFICATIONS,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const createNotification=(formData)=>async(dispatch)=>{
    try{
        const response=await useInsertData('/notification',formData)
        dispatch({
            type:CREATE_NOTIFICATIONS,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const deleteNotification=(id)=>async(dispatch)=>{
    try{
        const response=await useDeleteData(`/notification/${id}`)
        dispatch({
            type:DELETE_NOTIFICATIONS,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}