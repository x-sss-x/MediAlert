import {configureStore,combineReducers} from "@reduxjs/toolkit";
import {AuthActions,AuthSlice} from "./AuthSlice";
import { PeriodSlice,PeriodActions} from "./PeriodsSlice";
import {RMDActions,ReminderSlice} from "./ReminderSlice";
import { TimeSlice ,TimeActions} from "./TimeSlice";
import { persistStore, persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from 'redux-persist'
import DB from "@react-native-async-storage/async-storage"

const rootReducer = combineReducers({
    [AuthSlice.name]:AuthSlice.reducer,
    [ReminderSlice.name]:ReminderSlice.reducer,
    [PeriodSlice.name]:PeriodSlice.reducer,
    [TimeSlice.name]:TimeSlice.reducer
});

const persistedReducer = persistReducer({storage:DB,key:"root"}, rootReducer);

export default () => {
    let store = configureStore({
        reducer:persistedReducer,
        middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    })

    let persistor = persistStore(store);
    return { store, persistor }
  }

export {RMDActions,AuthActions,PeriodActions,TimeActions}
