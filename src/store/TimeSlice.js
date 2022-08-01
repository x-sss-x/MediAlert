import { createSlice } from "@reduxjs/toolkit";

export const TimeSlice = createSlice({
  name: "time",
  initialState: {},
  reducers:{
    addTime:(state,{payload})=>{
      Object.keys(payload).map((key)=>{
          if(typeof(state[key])=="undefined"){
            console.log("undefined",key)
            state[key] = [payload[key]]
          }else{
            state[key] = [payload[key],...state[key]]
          }
      })
    },
    remove:(state,{payload})=>{
      if(state[payload.date].length==1){
        console.log("1 element last")
        const {[payload.date]:value,...restTimePeriods} = state;
        return {...restTimePeriods};
      }else{
        state[payload.date] = [...state[payload.date].filter((value)=>value.Tid!==payload.Tid)];
      }
    },
    skip:(state,{payload:{Tid,date,Time}})=>{
      state[date] = [...state[date].filter((value)=>value.Tid !== Tid),{Tid,isSkip:true,isRemind:true,Time}]
    },
    had:(state,{payload:{Tid,date,Time}})=>{
      state[date] = [...state[date].filter((value)=>value.Tid !== Tid),{Tid,isSkip:false,isRemind:true,Time}]
    },
    intializeTime:(state)=>{
      return {}
    }
  },
  
});

export const TimeActions = TimeSlice.actions;


