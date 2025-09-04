
import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setuserData, setLoading, setError } from "../redux/userSlice"

export const getCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            dispatch(setLoading(true))
            try {
                const response = await axios.get(`${serverUrl}/user/verify`, { withCredentials: true })
                dispatch(setuserData(response.data))
            } catch (err) {
                dispatch(setError(err?.response?.data?.message || err.message))
            } finally {
                dispatch(setLoading(false))
            }
        }
        fetchUser()
    }, [dispatch])
}
