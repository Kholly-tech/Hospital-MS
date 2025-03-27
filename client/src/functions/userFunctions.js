import { getDataAPI, postDataAPI } from "../utils/api";
import Cookies from 'js-cookie';

export const signup = async (userDet) => {
    try {
        const res = await postDataAPI('signup', userDet);
        return res;
    } catch (error) {
        throw error;
    }
}

export const signin = async (userDet) => {
    try {
        const res = await postDataAPI('login', userDet);
        Cookies.set('token', `${res.token_type} ${res.token}`);
        return res;
    } catch (error) {
        throw error;
    }
}

export const getUser = async () => {
    try {
        const res = await getDataAPI('user');
        return res;
    } catch (error) {
        throw error;
    }
}

export const fetchUser = async() => {
    try {
        
    } catch (error) {
        throw error;
    }
}