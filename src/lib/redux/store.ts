import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import userReduce from './app/users.slice';
import subjectReduce from './app/subject.slice';
import eduLevelReduce from './app/eduLevel.slice';
import locationReduce from './app/location.slice';
import classesReduce from './app/class.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      users: userReduce,
      subject: subjectReduce,
      eduLevel: eduLevelReduce,
      location: locationReduce,
      class: classesReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
