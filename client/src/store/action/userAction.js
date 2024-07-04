import axiosInstance from "../../helper/config/axiosInstance";
import { getEmailList } from "../reducer/emailListSlice";
import { getUserLogin } from "../reducer/userSlice";


export const fetchUserDetails = ()=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.get('/auth/login/success');
        console.log(data)
        dispatch(getUserLogin(data.user));
        fetchEmailList()
    } catch (error) {
        console.log(error)
    }
};

export const fetchEmailList = ()=>async(dispatch)=>{
    try {
        const {data} = await axiosInstance.get('/emails/history');
        console.log(data)
        dispatch(getEmailList(data))
    } catch (error) {
        console.log(error)
    }
};




