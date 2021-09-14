/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import Register from './pages/Register';
import Recovery from './pages/Recovery';
import ProfileUser from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ControlMedic from './pages/ControlMedic';
import AddMascot from './pages/AddMascot';
import DetailsMascot from './pages/DetailsMascot';
import VaccinationsHistory from './pages/history/vaccinations';
import MedicHistory from './pages/history/medic';
import DewormingHistory from './pages/history/deworming';
import Notify from './shared/notify';

import {options, options2} from './shared/header_config';
import MenuContent from './components/menuContent';

const Stack = createStackNavigator();


const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Recovery"
            component={Recovery}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashBoard}
            options={({navigation, route}) => ({...options(navigation)})}
          />
          <Stack.Screen
            name="Notify"
            component={Notify}
            options={({navigation, route}) => ({
              title: 'Notificaciones',
              ...options2(navigation),
            })}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileUser}
            options={({navigation, route}) => ({
              title: 'Perfil',
              ...options2(navigation),
            })}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={({navigation, route}) => ({
              title: 'Editar Perfil',
              ...options2(navigation),
            })}
          />

          <Stack.Screen
            name="DetailsMascot"
            component={DetailsMascot}
            options={({navigation, route}) => ({
              title: 'Detalles Mascota',
              ...options2(navigation),
            })}
          />

          <Stack.Screen
            name="HistoryVaccinations"
            component={VaccinationsHistory}
            options={({navigation, route}) => ({
              title: 'Vacunaciones',
              ...options2(navigation),
            })}
          />

          <Stack.Screen
            name="HistoryMedic"
            component={MedicHistory}
            options={({navigation, route}) => ({
              title: 'Medicos',
              ...options2(navigation),
            })}
          />

          <Stack.Screen
            name="HistoryDeworming"
            component={DewormingHistory}
            options={({navigation, route}) => ({
              title: 'Desparacitaciones',
              ...options2(navigation),
            })}
          />

          <Stack.Screen
            name="AddMascot"
            component={AddMascot}
            options={({navigation, route}) => ({
              title: 'Añadir Mascota',
              ...options2(navigation),
            })}></Stack.Screen>

          <Stack.Screen
            name="ControlMedic"
            component={ControlMedic}
            options={({navigation, route}) => ({
              title: 'Control Medico',
              ...options2(navigation),
            })}></Stack.Screen>

          {/**Menu Drop Down**/}
          <Stack.Screen
            name="MenuDropDown"
            component={MenuContent}
            options={({navigation, route}) => ({
              title: 'Menu',
              ...options2(navigation),
            })}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
