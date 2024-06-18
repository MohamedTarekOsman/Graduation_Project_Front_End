import { useGetDataToken } from "../../customHooks/useGetData"
import { useInsertData } from "../../customHooks/useInsertData"
import { CREATE_WALLET, GET_ALL_WALLETS, GET_ERROR } from "../types"

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
