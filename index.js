import {AppRegistry} from "react-native";
import App from "./src/App";
import { Provider } from "react-redux";
import rdxstore from "./src/store";
import { Text } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import notifee, { EventType } from "@notifee/react-native";
import { useEffect } from "react";
import { ALMODULE } from "./src/utils";
import {Alarm} from "./src/screens";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// ALMODULE.stop();

const {store,persistor} = rdxstore();

notifee.registerForegroundService(() => {
  return new Promise(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.DELIVERED) {
        ALMODULE.start();
      }
    });

  });
});

notifee.onBackgroundEvent(async ({ detail, type }) => {
  if (type === EventType.DELIVERED) {
    ALMODULE.start();
  }
});



const RNRedux = () => {
  useEffect(()=>{
  },[])
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const RNReduxAlarm = ()=>{
  return(
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Alarm />
      </PersistGate>
    </Provider>
    )
}

AppRegistry.registerComponent("alarm", () => RNReduxAlarm);
AppRegistry.registerComponent("main", () => RNRedux);
