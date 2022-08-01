import notifee,{TriggerType,AndroidImportance,AndroidDefaults} from "@notifee/react-native";
import { Theme } from "./Theme";

async function displayNotifeeOn({Tid,TName,Quantity,Condition,Time,uTime,date}){
    const cid = await notifee.createChannel({
      id:Tid,
      name:"MediAlert",
      badge:true,
      soundURI:AndroidDefaults.SOUND,
      importance:AndroidImportance.HIGH,
      vibration:true
    })

    notifee.createTriggerNotification({
      title: `${TName}`,
      body:`${Quantity} ${Condition}`,
      data:{Time:uTime.toString(),date:date.toString()},
      android:{
        channelId:cid,
        smallIcon:"ic_launcher",
        color:Theme.colors.app.pri,
        colorized:true,
        pressAction:{
            id:"alarm",
            launchActivity:"alarm"
        },
        fullScreenAction:{
            id:"full-screen",
            mainComponent:"alarm"
        },
        asForegroundService:true,
        vibrationPattern:[20,20,20,20],
        actions:[
            {
                title:"<b>Open</b>",
                pressAction:{
                    id:"open",
                    mainComponent:"alarm"
                }
            }
        ]
      }
    },{
       type:TriggerType.TIMESTAMP,
       timestamp:Time
    })
}

export {displayNotifeeOn};