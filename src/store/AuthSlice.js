import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid"

export const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        uid:null,
        name:null,
        age:undefined
    },
    reducers:{
        addUser:(state,{payload:{Uname,age}})=>{
            const uid = uuid().slice(0,8);
            state.name = Uname;
            state.age = age;
            state.uid = uid;
        },
        removeUser:(state)=>{
            state.uid=null;
            state.name=null;
            state.age=undefined;
        }
    }
});

export const AuthActions = AuthSlice.actions;