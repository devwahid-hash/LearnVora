import { createSlice } from "@reduxjs/toolkit";

const courseSlice=createSlice({
    name:"course",
    initialState:{
        courseData:[],
        userCourseData:[]
    },
    reducers:{
        setcourseData:(state,action)=>{
        state.courseData=action.payload
    },
        setuserCourseData:(state,action)=>{
        state.userCourseData=action.payload
    }
}

})

export const {setcourseData,setuserCourseData}=courseSlice.actions
export default courseSlice.reducer;