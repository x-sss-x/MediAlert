import {extendTheme} from "native-base"

export const Theme = extendTheme({
    colors:{
        app:{
            pri:"#5E58FF",
            sec:"#D0CEFF"
        },
        bg:{
            pri:"#FDFDFF",
            transparent:"rgba(0,0,0,0.8)"
        },
        text:{
            sec:"#45455C",
            pri:"#000000",
            success:"#01EEBC",
            darksec:"#626262",
            failure:"#FF6C87"
        }
    }
})