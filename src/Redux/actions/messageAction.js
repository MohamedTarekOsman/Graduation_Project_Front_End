import { useGetDataToken } from "../../customHooks/useGetData";
import { useInsertData } from "../../customHooks/useInsertData";
import { CREATE_MESSAGE, DELETE_MESSAGES_BETWEEN_USERS, GET_ALL_MESSAGES, GET_ERROR } from "../types";

//create message
export const createMessage=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertData(`/message`,formData);
        dispatch({
            type:CREATE_MESSAGE,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all messages
export const getAllMessages=()=>async (dispatch)=>{
    try{
        const response=await useGetDataToken(`/message`)
        dispatch({
            type:GET_ALL_MESSAGES,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//delete messages between users
export const deleteMessageBetweenUsers=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertData(`/message/deleteMessagesBetweenUsers`,formData);
        dispatch({
            type:DELETE_MESSAGES_BETWEEN_USERS,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}