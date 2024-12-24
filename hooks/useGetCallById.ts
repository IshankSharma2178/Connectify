import { Call } from "@stream-io/video-react-sdk"
import { useState } from "react"

export const useGetCallById = {id:string | string[]} =>{
    const [call , setCall] =useState<Call>()
    const [isCallLoading , set]
}