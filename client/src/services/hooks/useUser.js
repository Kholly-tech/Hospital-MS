import { useState } from "react";
import { setCurrentUser, updateUser, logout } from "../redux/slice/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser, signin, signup } from "../../functions/userFunctions";

const useUser = () => {
    const { currentUser } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const fetchAuthUser = async () => {
        try {
            setLoading(true);
            const res = await fetchUser
            dispatch(setCurrentUser(res.data));
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async (userDet) => {
        try {
            return console.log('Got submit', userDet);
            setLoading(true);
            const res = await signin(userDet);
            dispatch(setCurrentUser(res.data));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        currentUser,
        fetchAuthUser,
        handleLogin,
    };
}

export default useUser;