import React from "react";
import { Avatar, Button, Heading, HStack, Spinner, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/AuthSlice";
import { Alert, NativeModules} from "react-native";
import { RMDActions,TimeActions} from "../store";

const Profile = () => {
  const { name, age, pending } = useSelector((data) => data.auth);
  const dispatch = useDispatch();
  return (
    <HStack direction={"column"} flex={"0.3"} alignItems={"center"}>
      <Avatar mt={"16"} size={"xl"} bg={"app.pri"}>
        {name.charAt(0)}
      </Avatar>
      <Heading my={"2"}>{name}</Heading>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        Age: {age}
      </Text>
      <Button
        bg={"app.pri"}
        my={"10"}
        onPress={async () => {
          Alert.alert("Are you sure?","This action will remove your data...",[{text:"Cancel",onPress:(value)=>{console.log(value)}},{
            text:"Logout",
            onPress: ()=>{
               dispatch(AuthActions.removeUser());
               dispatch(RMDActions.intializeRMD());
                dispatch(TimeActions.intializeTime());
            }
          }])
        }}
      >
        Logout
      </Button>
    </HStack>
  );
};

export default Profile;
