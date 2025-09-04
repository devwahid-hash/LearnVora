// ...existing code...
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    isLoading: true,
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => { state.isLoading = action.payload },
        setuserData: (state, action) => { state.userData = action.payload; state.isLoading = false },
        setError: (state, action) => { state.error = action.payload; state.isLoading = false },
        clearUser: (state) => { state.userData = null }
    }
})

export const { setLoading, setuserData, setError, clearUser } = userSlice.actions
export default userSlice.reducer
