import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import {  setuserCourseData } from "../redux/courseSlice"

export const userCourses=()=>{
    const {userData}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        if (!userData) return 
        const fetchCourses=async()=>{
            try {
                const result=await axios.get(`${serverUrl}/course/usercourses`,{withCredentials:true})
                dispatch(setuserCourseData(result.data))
            } catch (error) {
                console.log(`error in getAllcourses componenet ${error}`)
            }
        }
        fetchCourses()
    },[userData,dispatch])
}