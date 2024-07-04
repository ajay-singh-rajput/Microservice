import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth:false,
    userData :null
};


const UserSlice = createSlice({
    name:'user-slice',
    initialState,
    reducers:{
        getUserLogin:(state, action)=>{
            state.isAuth = true,
            state.userData = action.payload
        },
        logOutUser:(state)=>{
            state.isAuth = false,
            state.userData = null
        }
    }
})

export const {getUserLogin, logOutUser} = UserSlice.actions;
export default UserSlice.reducer;