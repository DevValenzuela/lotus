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

import MedicamentFilters from './pages/filters/Medicament';
import ControllerVet from './pages/filters/ControllerVet';
import DewormingFilters from './pages/filters/Deworming';
import VaccinateFilters from './pages/filters/Vaccinate';

import MenuContent from './components/menuContent';
import Notify from './shared/notify';

import {options, options2} from './shared/header_config';
import MedicamentHistory from './pages/history/medicament';

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
        options={() => ({...options()})}
      />
      <Stack.Screen
        name="Notify"
        component={Notify}
        options={() => ({
          title: 'Notificaciones',
          ...options2(),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileUser}
        options={({navigation, route}) => ({
          title: 'Perfil',
          ...options2(),
        })}
      />
      <Stack.Screen
        name="CtrVet"
        component={ControllerVet}
        options={() => ({
          title: 'Veterinario',
          ...options2(),
        })}
      />
      <Stack.Screen
        name="DewormingFilter"
        component={DewormingFilters}
        options={() => ({
          title: 'Desparacitaciones',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="MedicamentFilter"
        component={MedicamentFilters}
        options={() => ({
          title: 'Medicación',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="VaccinateFilter"
        component={VaccinateFilters}
        options={() => ({
          title: 'Vacunaciones',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={() => ({
          title: 'Editar Perfil',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="DetailsMascot"
        component={DetailsMascot}
        options={() => ({
          title: 'Detalle Mascota',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="HistoryVaccinations"
        component={VaccinationsHistory}
        options={() => ({
          title: 'Vacunaciones',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="HistoryMedic"
        component={MedicHistory}
        options={() => ({
          title: 'Medicos',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="HistoryMedicament"
        component={MedicamentHistory}
        options={() => ({
          title: 'Medicamento',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="HistoryDeworming"
        component={DewormingHistory}
        options={() => ({
          title: 'Desparacitaciones',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="EditGeneral"
        component={General}
        options={() => ({
          title: 'General',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="EditVaccinations"
        component={Vaccinations}
        options={() => ({
          title: 'Vacunación',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="EditControlMedic"
        component={ControlMedic}
        options={() => ({
          title: 'Control Medico',
          ...options2(),
        })}></Stack.Screen>

      <Stack.Screen
        name="EditDeworming"
        component={Deworming}
        options={() => ({
          title: 'Desparacitación',
          ...options2(),
        })}></Stack.Screen>

      <Stack.Screen
        name="AddMascot"
        component={AddMascot}
        options={() => ({
          title: 'Añadir Mascota',
          ...options2(),
        })}></Stack.Screen>

      {/**Menu Drop Down**/}
      <Stack.Screen
        name="MenuDropDown"
        component={MenuContent}
        options={() => ({
          title: 'Menu',
          ...options2(),
        })}></Stack.Screen>
    </Stack.Navigator>
  );
}
