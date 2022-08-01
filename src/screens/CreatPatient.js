import React, { useState } from 'react';
import {Box, Button, Heading, Input, StatusBar, Toast,Text, Image} from "native-base"
import { useDispatch,useSelector} from 'react-redux';
import { AuthActions} from '../store';
import {MAlert} from '../components';
import { Theme } from '../utils';
import logo from "../../assets/adaptive-icon.png";

const CreatPatient = () => {
  const [name,setName] = useState("");
  const [age,setAge] = useState("");
  const dispatch = useDispatch();

  async function CreateUser(){
    if(!name || !age){
      Toast.show({
        render:()=>{
          return(<MAlert status={"error"} msg={"Fill all the fields"}/>);
        },
        placement:"top",
        duration:3000
       });
       return;
    }
    else{
      await dispatch(AuthActions.addUser({Uname:name,age}));
      Toast.show({
        render:()=>{
          return(<MAlert status={"success"} msg={AuthError?AuthError:"Account Created Successfully"}/>);
        },
        placement:"top",
        duration:3000
      });
    }
  }

  return (
    <Box flex={"1"} alignItems={"center"} bg="bg.pri">
      <StatusBar backgroundColor={Theme.colors.bg.pri} barStyle="dark-content"/>
        <Image source={logo} height={100} width={100} alt={"Logo"}/>
        <Heading color={"text.success"}>MediAlert</Heading>
        <Heading my={"5"}><Text color={"text.pri"}>Create Account</Text></Heading>
        <Box width={"72"}>
            <Input mt={"3.5"} placeholderTextColor={"text.sec"} onChangeText={(value)=>setName(value)} size={"md"} value={name} type='text' placeholder='Enter the name'/>
            <Input mt={"3.5"} placeholderTextColor={"text.sec"} onChangeText={(value)=>setAge(value)} size={"md"} value={age} type="text" placeholder='Enter the age' keyboardType='number-pad'/>
            <Button bg={"app.pri"} mt={"3.5"} size={"md"} onPress={CreateUser}>{
                "Create"
            }</Button>
        </Box>
    </Box>
  )
}

export default CreatPatient