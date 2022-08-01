import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  NativeBaseProvider,
  StatusBar,
  Text,
} from "native-base";
import { ALMODULE,Theme} from "../utils";
import notifee from "@notifee/react-native";
import { Check, X } from "react-native-feather";
import { Animated} from "react-native";
import {Capsule} from "../components";
import { useDispatch } from "react-redux";
import { TimeActions } from "../store";

const Alarm = () => {
  const scale = new Animated.Value(1);
  const [title, setTitle] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [isExistNotifee, setIsExistNotifee] = useState(null);
  const [data,setData] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    async function onload() {
      const notifeeeeawait = await notifee.getInitialNotification();
      setIsExistNotifee(notifeeeeawait.notification.android.channelId);
      setTitle(notifeeeeawait.notification.title);
      setStatus(notifeeeeawait.notification.body);
      setData(notifeeeeawait.notification.data);
    }
    onload();

    const anime = Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.15,
        duration: 900,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        useNativeDriver: false,
      }),
    ]);

    Animated.loop(anime, {
      iterations: 8,
    }).start();
  }, []);

  if (isExistNotifee) {
    return (
      <NativeBaseProvider theme={Theme}>
        <Box
          bg={"app.pri"}
          flex={1}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={Theme.colors.app.pri}
          />
          <Box
            justifyContent={"flex-end"}
            alignItems={"center"}
            flex={1}
            width={"100%"}
          >
            <Capsule style={{ marginBottom: 30 }} size={70} color={"white"} />
            <Heading shadow={"9"} fontSize={40} color={"white"}>
              {title} {}
            </Heading>
            <Text shadow={"9"} fontSize={25} color={"white"}>
              {status}
            </Text>
          </Box>
          <Box
            py={"16"}
            flex={1}
            justifyContent={"space-around"}
            alignItems={"flex-end"}
            flexDirection={"row"}
            width={"100%"}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <Button
                shadow={"9"}
                height={65}
                width={65}
                onPress={async () => {
                    dispatch(TimeActions.skip({Tid:isExistNotifee,Time:data.Time,date:data.date}));
                    ALMODULE.stop();
                    await notifee.stopForegroundService();
                    await notifee.cancelTriggerNotification(isExistNotifee);
                    setIsExistNotifee(null);
                }}
                bg={"text.failure"}
                borderRadius={100}
              >
                <X height={40} width={40} color={"white"} />
              </Button>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale }] }}>
              <Button
                shadow={"9"}
                height={65}
                width={65}
                onPress={async () => {
                  dispatch(TimeActions.had({Tid:isExistNotifee,Time:data.Time,date:data.date}));
                  ALMODULE.stop();
                  await notifee.stopForegroundService();
                  await notifee.cancelTriggerNotification(isExistNotifee);
                  setIsExistNotifee(null);
                }}
                bg={"text.success"}
                borderRadius={100}
              >
                <Check height={40} width={40} color={"white"} />
              </Button>
            </Animated.View>
          </Box>
        </Box>
      </NativeBaseProvider>
    );
  } else {
    return null;
  }
};

export default Alarm;
