import {createSlice} from "@reduxjs/toolkit"

export const ReminderSlice = createSlice({
    name:"RMDList",
    initialState:[],
    reducers:{
        addRMD:(state,{payload})=>{
           state.push({...payload})
        },
        removeRMD:(state,{payload})=>{
            return state.filter((value,i)=>value.Tid!==payload.Tid);
        },
        intializeRMD:(state)=>{
            return [];
        }
    }
});

export const RMDActions = ReminderSlice.actions;