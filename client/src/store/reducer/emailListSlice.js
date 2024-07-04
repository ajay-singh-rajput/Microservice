import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emailList :null
};


const EmailListSlice = createSlice({
    name:'user-slice',
    initialState,
    reducers:{
        getEmailList:(state, action)=>{
            state.emailList = action.payload
        },
        // logOutUser:(state)=>{
        //     state.isAuth = false,
        //     state.userData = null
        // }
    }
})

export const {getEmailList} = EmailListSlice.actions;
export default EmailListSlice.reducer;