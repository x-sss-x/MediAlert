import { View, Text, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Box, Button, Row, StatusBar } from "native-base";
import { Theme } from "../utils";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { PeriodActions } from "../store/PeriodsSlice";

const MCalendar = ({ route, navigation }) => {
  const prestDay = new Date(Date.now());
  const [days, setDays] = useState({ ...route.params });
  const dispatch = useDispatch();
  const periodsList = useSelector((data) => data.periods);
  useEffect(() => {
    Keyboard.dismiss();
  }, [days]);
  return (
    <Box
      flex={1}
      bg={"bg.transparent"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <StatusBar
        backgroundColor={Theme.colors.bg.transparent}
        barStyle={"light-content"}
      />
      <Calendar
        style={{ borderRadius: 3 }}
        markingType={"period"}
        markedDates={{
          ...periodsList,
        }}
        minDate={moment(prestDay).format("YYYY-MM-DD")}
        onDayPress={({ dateString }) => {
          if (dateString in periodsList) {
            dispatch(PeriodActions.removePeriod(dateString));
          } else {
            dispatch(
              PeriodActions.addPeriod({
                ...days,
                [dateString]: {
                  selected: !days[dateString]?.selected,
                  customContainerStyle: {
                    backgroundColor: Theme.colors.text.success,
                  },
                },
              })
            );
          }
        }}
        theme={{
          calendarBackground: Theme.colors.app.pri,
          textDisabledColor: Theme.colors.app.sec,
          monthTextColor: Theme.colors.bg.pri,
          textColor: Theme.colors.bg.pri,
          dayTextColor: Theme.colors.bg.pri,
          textDayStyle: {
            fontWeight: "bold",
            fontSize: 35,
          },
          selectedDayBackgroundColor: "red",
        }}
      />
      <Row space={100} mt={5}>
        <Button onPress={() => navigation.goBack()}>Cancel</Button>
        <Button onPress={() => navigation.navigate("AddNewRMD")}>Ok</Button>
      </Row>
    </Box>
  );
};

export default MCalendar;
