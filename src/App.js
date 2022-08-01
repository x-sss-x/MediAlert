import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Box, NativeBaseProvider } from "native-base";
import { Activity, User, Plus } from "react-native-feather";
import { Profile, AddTabletRMD, CreatPatient,RMDList,MoreAction} from "./screens";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {MCalender} from "./components";
import {Theme } from "./utils";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MTab = () => {
  const name = useSelector((data) => data.auth.name);
 
  return (
    <Tab.Navigator
      inactiveColor={Theme.colors.app.sec}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Theme.colors.app.pri,
        tabBarInactiveTintColor: Theme.colors.app.sec,
        tabBarStyle: {
          position: "absolute",
          opacity: 0.9,
          backgroundColor: "rgba(255,255,255,0.8)",
          height: 60,
          paddingHorizontal: 15,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => {
            return <Activity color={props.color} />;
          },
        }}
        name="Home"
        component={RMDList}
      />
      <Tab.Screen
        name="Add"
        component={AddTabletRMD}
        options={{
          tabBarIcon: (props) => {
            return (
              <Box
                opacity={1}
                bg={"app.pri"}
                alignItems={"center"}
                justifyContent={"center"}
                width={60}
                height={60}
                borderRadius={30}
                mb={"1/3"}
              >
                <Plus scale={2} color={Theme.colors.bg.pri} />
              </Box>
            );
          },
          tabBarLabel: name,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddNewRMD");
          },
        })}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => {
            return <User color={props.color} />;
          },
          tabBarLabel: name,
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const uid = useSelector((data) => data.auth.uid);
  const isAppLoading = useSelector((data) => data.auth.pending);

  if (isAppLoading) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <NativeBaseProvider theme={Theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {uid ? (
              <>
                <Stack.Screen name="MHome" component={MTab} />
                <Stack.Group
                  screenOptions={{ presentation: "fullScreenModal" }}
                >
                  <Stack.Screen name="AddNewRMD" component={AddTabletRMD} />
                </Stack.Group>
                <Stack.Group
                  screenOptions={{ presentation: "containedTransparentModal" }}
                >
                  <Stack.Screen name="MoreAction" component={MoreAction} />
                  <Stack.Screen name="Calendar" component={MCalender} />
                </Stack.Group>
              </>
            ) : (
              <Stack.Screen name="CreatePatient" component={CreatPatient} />
            )}
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
}
