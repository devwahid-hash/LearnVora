import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setcourseData } from "../redux/courseSlice"

export const getAllCourses=()=>{
    const {userData}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchCourses=async()=>{
            try {
                const result=await axios.get(`${serverUrl}/course/getcourses`,{withCredentials:true})
                dispatch(setcourseData(result.data))
            } catch (error) {
                console.log(`error in getAllcourses componenet ${error}`)
            }
        }
        fetchCourses()
    },[])
}