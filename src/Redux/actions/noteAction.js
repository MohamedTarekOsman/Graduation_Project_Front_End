import useDeleteData from "../../customHooks/useDeleteData"
import { useGetDataToken } from "../../customHooks/useGetData"
import { useInsertData } from "../../customHooks/useInsertData"
import { CREATE_NOTE, DELETE_NOTE, GET_ALL_NOTES, GET_ERROR } from "../types"

export const getAllNotes=()=>async(dispatch)=>{
    try{
        const response=await useGetDataToken('/note')
        dispatch({
            type:GET_ALL_NOTES,
            payload:response
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//create notes
export const createNote=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertData(`/note`,formData);
        dispatch({
            type:CREATE_NOTE,
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

//delete notes
export const deleteNote=(id)=>async (dispatch)=>{
    try{
        const response=await useDeleteData(`/note/${id}`);
        dispatch({
            type:DELETE_NOTE,
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
