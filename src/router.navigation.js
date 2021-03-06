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
import DetailsMascotOffline from './pages/DetailsMascotOffline';
import VaccinationsHistory from './pages/history/vaccinations';
import MedicHistory from './pages/history/medic';
import DewormingHistory from './pages/history/deworming';
import AddMascot from './pages/AddMascot';

import ControlMedic from './pages/edit/ControlMedic';
import Deworming from './pages/edit/Deworming';
import Vaccinations from './pages/edit/Vaccinations';
import General from './pages/edit/General';
import Medicament from './pages/edit/Medicament';

import MedicamentFilters from './pages/filters/Medicament';
import ControllerVet from './pages/filters/ControllerVet';
import DewormingFilters from './pages/filters/Deworming';
import VaccinateFilters from './pages/filters/Vaccinate';
import Notification from './pages/Notification';
import Gratulations from './pages/Gratulations';

import MenuContent from './components/menuContent';
import Notify from './shared/notify';

import {options, options2} from './shared/header_config';
import MedicamentHistory from './pages/history/medicament';
import DetailsGeneral from './pages/DetailsGeneral';
import DetailsOfflineGeneral from './pages/DetailsOfflineGeneral';
import NewDate from './pages/NewDate';
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
          title: 'Desparasitaciones',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="MedicamentFilter"
        component={MedicamentFilters}
        options={() => ({
          title: 'Medicaci??n',
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
        name="DetailsGeneral"
        component={DetailsGeneral}
        options={() => ({
          title: 'Detalle.',
          ...options2(),
        })}
      />

      {/**Details Mascot Offline**/}
      <Stack.Screen
        name="DetailsMascotOffline"
        component={DetailsMascotOffline}
        options={() => ({
          title: 'Detalle Mascota',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="DetailsOfflineGeneral"
        component={DetailsOfflineGeneral}
        options={() => ({
          title: 'Detalles',
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
          title: 'Desparasitaciones',
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
          title: 'Vacunaci??n',
          ...options2(),
        })}
      />

      <Stack.Screen
        name="EditMedicament"
        component={Medicament}
        options={() => ({
          title: 'Medicaci??n',
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
          title: 'Desparasitaci??n',
          ...options2(),
        })}></Stack.Screen>

      <Stack.Screen
        name="AddMascot"
        component={AddMascot}
        options={() => ({
          title: 'A??adir Mascota',
          ...options2(),
        })}></Stack.Screen>

      <Stack.Screen
        name="NewData"
        component={NewDate}
        options={{
          headerShown: false,
        }}></Stack.Screen>

      {/**Menu Drop Down**/}
      <Stack.Screen
        name="MenuDropDown"
        component={MenuContent}
        options={() => ({
          title: 'Menu',
          ...options2(),
        })}></Stack.Screen>

      {/**Screen Gratulations**/}
      <Stack.Screen
        name="Gratulations"
        component={Gratulations}
        options={{headerShown: false}}></Stack.Screen>

      {/**Screen Gratulations**/}
      <Stack.Screen
        name="ScreenNotification"
        component={Notification}
        options={{headerShown: false}}></Stack.Screen>

    </Stack.Navigator>
  );
}
