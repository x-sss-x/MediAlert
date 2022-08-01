import { Box, StatusBar, Text } from "native-base";
import React from "react";
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { TimeActions } from "../store";
import notifee from "@notifee/react-native"

const MoreAction = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { date,TName,TItem:{Tid,Time,isSkip,isRemind} } = route.params;

  function onDelete() {
    dispatch(TimeActions.remove({ Tid, date }));
    notifee.cancelTriggerNotification(Tid);
    navigation.goBack();
  }

  function onSkip() {
    dispatch(TimeActions.skip({ Tid, date, Time }));
    notifee.cancelTriggerNotification(Tid);
    navigation.goBack();
  }

  return (
    <Box
      onAccessibilityTap={() => navigation.goBack()}
      background={"rgba(0,0,0,.3)"}
      alignItems={"center"}
      flex={1}
      justifyContent={"center"}
    >
        <StatusBar translucent backgroundColor={"rgba(0,0,0,.002)"}/>
      <TouchableWithoutFeedback onBlur={() => navigation.goBack()}>
        <Box
          shadow={"3"}
          justifyContent={"space-around"}
          pb={3}
          bg={"bg.pri"}
          width={"90%"}
          alignItems={"center"}
          borderRadius={15}
        >
          <Box py={5} alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={15}>
              {TName}
            </Text>
            <Text color={"text.sec"} fontSize={13}>
              {date}
            </Text>
          </Box>
          <TouchableNativeFeedback onPress={onDelete}>
            <Box width={"90%"} alignItems={"center"} py={4}>
              <Text color={"text.failure"}>Delete</Text>
            </Box>
          </TouchableNativeFeedback>
          {!isSkip && !isRemind ? (
            <TouchableNativeFeedback onPress={onSkip}>
              <Box width={"90%"} alignItems={"center"} py={4}>
                <Text color={"text.failure"}>Skip</Text>
              </Box>
            </TouchableNativeFeedback>
          ) : null}
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
};

export default MoreAction;
