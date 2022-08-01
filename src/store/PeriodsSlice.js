import {createSlice} from "@reduxjs/toolkit"
import moment from "moment";
import { Theme } from "../utils";

const todayDate = moment(new Date(Date.now())).format("YYYY-MM-DD");
export const PeriodSlice = createSlice({
    name:"periods",
    initialState:{[todayDate]:{selected:true,
        customContainerStyle: {
          backgroundColor: Theme.colors.text.success,
        },}},
        
    reducers:{
        addPeriod:(state,action)=>{
            return {...state,...action.payload}
        },
        removePeriod:(state,action)=>{
            let {[action.payload]:value,...newData} = state;
            return {...newData}
        }
    }
});

export const PeriodActions = PeriodSlice.actions;