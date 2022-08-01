import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Column,
  FormControl,
  Input,
  Radio,
  Row,
  Stack,
  StatusBar,
  Text,
  Toast,
  VStack,
} from "native-base";
import { v4 as uuid } from "uuid";
import { Theme,displayNotifeeOn } from "../utils";
import { RMDActions,TimeActions } from "../store";
import { Calendar, Clock, ArrowLeft } from "react-native-feather";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import {MAlert} from "../components"

const AddTabletRMD = ({ navigation }) => {
  const inputRef = useRef(null); 
  const [TName, setTname] = useState("");
  const [Quantity, setQuantity] = useState("1");
  const [Condition, setCondition] = useState("After Food");
  const [Time, setTime] = useState("");
  const dispatch = useDispatch();
  const periods = useSelector((data) => data.periods);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function onFormSubmit() {

    if(TName.length==0){
      Toast.show({
        render:()=>{
          return(<MAlert status={"error"} msg={"Tablet name required!"}/>);
        },
        placement:"top",
        duration:3000
      });
      return
    }

    if(Time.length == 0){
      Toast.show({
        render:()=>{
          return(<MAlert status={"error"} msg={"Set the time to future!"}/>);
        },
        placement:"top",
        duration:3000
      });
      return
    }

    const Tid = uuid().slice(0, 8);
    //adding tablet list
    dispatch(RMDActions.addRMD({ Tid, TName, Quantity, Condition }));
    //sheduling alarm 
    Object.keys(periods).map((date) => {
      const parseInSeconds = new Date(Date.now());
      const time = Time.split(":");
      parseInSeconds.setHours(time[0]);
      parseInSeconds.setMinutes(time[1]);
      parseInSeconds.setSeconds(0);
      console.warn(time[0],time[1],0)
      displayNotifeeOn({Tid,TName,Quantity,Condition,Time:parseInSeconds.getTime(),date,uTime:Time});
      dispatch(TimeActions.addTime({[date]: { Tid, isSkip: false, isRemind: false, Time },}));
    });
    navigation.navigate("Home")
  }
  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"bg.pri"}
    >
      <StatusBar
        backgroundColor={Theme.colors.bg.pri}
        barStyle={"dark-content"}
      />

      {/* form header */}
      <Row
        space={10}
        justifyContent={"space-between"}
        alignItems={"center"}
        pr={10}
      >
        <ArrowLeft
          color={"blue"}
          scale={2}
          onPress={() => navigation.navigate("MHome")}
        />
        <Text color={"text.pri"} fontSize={"lg"} fontWeight={"bold"}>
          Add New Pill Reminder
        </Text>
      </Row>

      {/* form body */}
      <VStack space={3} px={"5"} py={"6"} width={"90%"} bg={"bg.pri"}>
        <Row>
          <FormControl>
            <FormControl.Label>Pill Name</FormControl.Label>
            <Input
              ref={inputRef}
              value={TName}
              onChangeText={(pillName) => setTname(pillName)}
            />
          </FormControl>
        </Row>
        <Row space={20}>
          <Column>
            <FormControl>
              <FormControl.Label>Quantity</FormControl.Label>
              <Radio.Group
                value={Quantity}
                onChange={(value) => setQuantity(value)}
                colorScheme={"violet"}
                name="Quntity"
              >
                <Radio value="1" my={1}>
                  1
                </Radio>
                <Radio value="1/2" my={1}>
                  1/2
                </Radio>
                <Radio value="2" my={1}>
                  2
                </Radio>
              </Radio.Group>
            </FormControl>
          </Column>
          <Column>
            <FormControl>
              <FormControl.Label>Condition</FormControl.Label>
              <Radio.Group
                value={Condition}
                onChange={(value) => setCondition(value)}
                colorScheme={"violet"}
                name="Condition"
                defaultValue="After Food"
              >
                <Stack>
                  <Radio value="After Food" my={2}>
                    After Food
                  </Radio>
                  <Radio value="Before Food" my={2}>
                    Before Food
                  </Radio>
                </Stack>
              </Radio.Group>
            </FormControl>
          </Column>
        </Row>
        <Row justifyContent={"space-between"}>
          <Column>
            <FormControl>
              <Button
                bg={"app.pri"}
                onPress={() => {
                  navigation.navigate("Calendar");
                }}
              >
                <Calendar color={Theme.colors.bg.pri} />
              </Button>
            </FormControl>
          </Column>
          <Column>
            <FormControl isInvalid={Time.length==0}>
              <Button
                bg={"app.pri"}
                onPress={() => {
                  DateTimePickerAndroid.open({
                    value: new Date(Date.now()),
                    mode: "time",
                    onChange: (event, time) => {
                      const dateObj = new Date(event.nativeEvent.timestamp);
                      setTime(`${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`);
                    }
                  });
                }}
                >
                <Clock color={Theme.colors.bg.pri} />
              </Button>
              <FormControl.ErrorMessage>set time</FormControl.ErrorMessage>
            </FormControl>
          </Column>
        </Row>
        <Row justifyContent={"center"}>
          <Button onPress={onFormSubmit} bg={"app.pri"} size={"lg"} px={"16"}>
            Add
          </Button>
        </Row>
      </VStack>
    </Box>
  );
};

export default AddTabletRMD;
