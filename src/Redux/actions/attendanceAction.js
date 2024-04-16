import { useGetDataToken } from "../../customHooks/useGetData"
import { GET_ALL_ATTENDANCES, GET_ERROR } from "../types"

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