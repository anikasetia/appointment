import React from 'react';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import configureStore from './configureStore';

import {createStackNavigator, createAppContainer} from 'react-navigation';

import RequestAppointment from './screens/RequestAppointment';
import UserDetail from './screens/UserDetails';
import CameraScreen from './screens/CameraScreen';

const AppNavigator = createStackNavigator(
    {
      RequestAppointment: RequestAppointment,
      UserDetail: UserDetail,
      CameraScreen:CameraScreen
    },
    {
      initialRouteName: "RequestAppointment"
    }
  );
  

const store = configureStore()
const AppContainer = createAppContainer(AppNavigator);

const App = () => {

       return (
            <Provider store = {store}>
                <AppContainer />
            </Provider>
        )
}

export default App;