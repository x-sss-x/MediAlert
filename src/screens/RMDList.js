import {
  View,
  StatusBar,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";
import { Box, Center,Text } from "native-base";
import {ArrowDown} from "react-native-feather"
import { Theme } from "../utils";
import {TabList,DateTab} from "../components";

const RMDList = ({navigation}) => {
  const RMDList = useSelector((data) => data.RMDList);
  const TimeList = useSelector((data) => data.time);
  const [length,setLength] = useState(Object.keys(TimeList).length);
  const {height} = Dimensions.get("screen")
  const [CurrentDate, setCurrentDate] = useState(
    moment(new Date(Date.now())).format("YYYY-MM-DD")
  );
  
  useEffect(()=>{
    setLength(Object.keys(TimeList).length)
  },[TimeList]);
  
  return (
    <View style={{ flex: 1, backgroundColor: Theme.colors.bg.pri }}>
      <StatusBar barStyle={"light-content"} backgroundColor={Theme.colors.app.pri} />
      {/* Header */}
      <View
        style={{
          height: 55,
          paddingVertical:10 ,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:Theme.colors.app.pri,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: Theme.colors.bg.pri }}>
          {moment(CurrentDate).format("MMMM - YYYY")}
        </Text>
      </View>
      {/* periods tabs */}
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: Theme.colors.app.pri,
          flexDirection: "row",
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Box paddingX={5} flexDirection={"row"} alignItems={"center"} flex={1}>
            {length ? (
              Object.keys(TimeList).sort((a,b)=> new Date(a)-new Date(b)).map((date, index) => {
                return (
                  <DateTab key={index} onPress={()=>setCurrentDate(date)} CurrentDate={CurrentDate} date={date}/>
                );
              })
            ) :
             //skeleton list
              new Array(7).fill(1).map((value,index)=>{
               return (<Box
                width={30}
                bg={"app.sec"}
                height={30}
                borderRadius={50}
                alignItems={"center"}
                justifyContent={"center"}
                mx={2}
                key={index}
                />)
              })
            }
          </Box>
        </ScrollView>
      </View>
      {/* RMD List */}
      <ScrollView bounces={true}>
        <Box paddingX={5} flex={1} style={{ paddingBottom: 85 }}>
          
          {length?RMDList.map((Tablet) => {
            return Object.keys(TimeList).map((date) => {
              if (date == CurrentDate) {

                return TimeList[date].map((TItem, i) => {
                  //checking to particular id
                  if (Tablet.Tid == TItem.Tid) {
                    return (
                      <TabList onPress={()=>{
                        navigation.navigate("MoreAction",{date,TItem,TName:Tablet.TName});
                      }} key={i} CurrentDate={CurrentDate} TabletList={Tablet} TimeList={TItem}/>
                    );
                  }
                });
              }
            });
          }):(
            <Box justifyContent={"flex-end"} height={(height/150)*100}>
              <Center><Text fontSize={18} fontWeight={"bold"}>Add New Tablet</Text></Center>
              <Center><Text fontSize={14}>Click Here</Text></Center>
              <Center><ArrowDown height={30} width={30} color={Theme.colors.text.sec}/></Center>
            </Box>
          )
        }
        </Box>
      </ScrollView>
    </View>
  );
};

export default RMDList;
