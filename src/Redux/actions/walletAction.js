import useDeleteData from "../../customHooks/useDeleteData"
import { useGetDataToken } from "../../customHooks/useGetData"
import { useInsertData } from "../../customHooks/useInsertData"
import { useUpdateData } from "../../customHooks/useUpdateData"
import { CREATE_WALLET, DELETE_WALLET, GET_ALL_WALLETS, GET_ERROR, UPDATE_WALLET } from "../types"

export const getAllWallet=()=>async(dispatch)=>{
    try{
        const response=await useGetDataToken('/wallet')
        dispatch({
            type:GET_ALL_WALLETS,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}
export const createWallet=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertData(`/wallet`,formData);
        dispatch({
            type:CREATE_WALLET,
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
export const deleteWallet=(id)=>async (dispatch)=>{
    try{
        const response=await useDeleteData(`/wallet/${id}`);
        dispatch({
            type:DELETE_WALLET,
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

export const updateWallet=(id,formdata)=>async (dispatch)=>{
    try{
        const response=await useUpdateData(`/wallet/${id}`,formdata);
        dispatch({
            type:UPDATE_WALLET,
            payload:response,
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}