import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import ProfileUser from './pages/user/Profile';
import Register from './pages/user/Register';
import Recovery from './pages/user/Recovery';
import EditProfile from './pages/user/EditProfile';
import DetailsMascot from './pages/DetailsMascot';
import VaccinationsHistory from './pages/history/vaccinations';
import MedicHistory from './pages/history/medic';
import DewormingHistory from './pages/history/deworming';
import AddMascot from './pages/AddMascot';

import ControlMedic from './pages/edit/ControlMedic';
import Deworming from './pages/edit/Deworming';
import Vaccinations from './pages/edit/Vaccinations';
import General from './pages/edit/General';

import MenuContent from './components/menuContent';
import Notify from './shared/notify';

import {options, options2} from './shared/header_config';

const Stack = createStackNavigator();

export function RouterNavigation() {
  return (
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
        name="EditGeneral"
        component={General}
        options={({navigation, route}) => ({
          title: 'General',
          ...options2(navigation),
        })}
      />

      <Stack.Screen
        name="EditVaccinations"
        component={Vaccinations}
        options={({navigation, route}) => ({
          title: 'Vacunación',
          ...options2(navigation),
        })}
      />

      <Stack.Screen
        name="EditControlMedic"
        component={ControlMedic}
        options={({navigation, route}) => ({
          title: 'Control Medico',
          ...options2(navigation),
        })}></Stack.Screen>

      <Stack.Screen
        name="EditDeworming"
        component={Deworming}
        options={({navigation, route}) => ({
          title: 'Desparacitación',
          ...options2(navigation),
        })}></Stack.Screen>

      <Stack.Screen
        name="AddMascot"
        component={AddMascot}
        options={({navigation, route}) => ({
          title: 'Añadir Mascota',
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
  );
}
