import {gql} from '@apollo/client';
export const BANNER_APP = gql`
  query banners {
    banners(limit: 1) {
      ofert {
        id
        url
      }
    }
  }
`;

export const CONSULT_APP = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      blocked
      confirmed
      avatar {
        id
        url
      }
    }
  }
`;

export const CONSULT_MASCOT_APP = gql`
  query mascot($id: ID!) {
    mascot(id: $id) {
      id
      avatar_mascot {
        url
      }
    }
  }
`;

export const CONSULT_MASCOTS_APP = gql`
  query mascots($id: ID!) {
    mascots(where: {users_permissions_user: {id: $id}}) {
      id
      name_mascot
      avatar_mascot {
        id
        url
      }
      users_permissions_user {
        id
      }
    }
  }
`;

export const CONSULT_MASCOT_APP_SQLITE = gql`
  query mascot($id: String!) {
    mascots(sort: "id:desc", limit: 1, where: {id_mascot: $id}) {
      id
      name_mascot
      avatar_mascot {
        id
        url
      }
    }
  }
`;

export const CONSULT_MASCOT_APP_ID = gql`
  query mascot($id: ID!) {
    mascot(id: $id) {
      id
      id_mascot
      name_mascot
      age_mascot
      race_mascot
      type_mascot
      date_sterilized
      microchip
      number_microchip
      description
      avatar_mascot {
        id
        url
      }
      users_permissions_user {
        id
      }
    }
  }
`;

export const CONSULT_DEWORMING_APP = gql`
  query desparacitacions($user: ID!, $mascot: ID!) {
    desparacitacions(
      sort: "id:desc"
      limit: 1
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      id_deworming
      last_deworming
      medicament
      note
    }
  }
`;

export const CONSULT_DEWORMING_DETAILS_APP = gql`
  query desparacitacions($user: ID!, $id_details: String!) {
    desparacitacions(
      sort: "id:desc"
      limit: 1
      where: {users_permissions_user: $user, id_deworming: $id_details}
    ) {
      id
      id_deworming
      last_deworming
      medicament
      note
    }
  }
`;

export const CONSULT_VACCINATIONS_APP = gql`
  query Vacunacions($user: ID!, $mascot: ID!) {
    vacunacions(
      sort: "id:desc"
      limit: 1
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      id_vaccination
      last_vaccination
      medicaments
      note
    }
  }
`;

export const CONSULT_VACCINATIONS_DETAILS_APP = gql`
  query Vacunacions($user: ID!, $id_details: ID!) {
    vacunacions(
      sort: "id:desc"
      limit: 1
      where: {users_permissions_user: $user, id_vaccination: $id_details}
    ) {
      id
      id_vaccination
      last_vaccination
      medicaments
      note
    }
  }
`;

export const CONSULT_CONTROLLER_MEDICS_APP = gql`
  query ControllerMedics($user: ID!, $mascot: ID!) {
    controllerMedics(
      sort: "id:desc"
      limit: 1
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      id_medic
      last_control
      assesment
      note
    }
  }
`;

export const CONSULT_CONTROLLER_MEDICS_DETAILS_APP = gql`
  query ControllerMedics($user: ID!, $id_details: ID!) {
    controllerMedics(
      sort: "id:desc"
      limit: 1
      where: {users_permissions_user: $user, id_medic: $id_details}
    ) {
      id
      id_medic
      last_control
      assesment
      note
    }
  }
`;

export const CONSULT_MEDICAMENT_APP = gql`
  query medicaments($user: ID!, $mascot: ID!) {
    medicaments(
      sort: "id:desc"
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      id_medicament
      last_dose
      medicament
      posologia
      dosis
      period
      notation
    }
  }
`;

export const CONSULT_MEDICAMENT_DETAILS_APP = gql`
  query medicaments($user: ID!, $id_details: String!) {
    medicaments(
      sort: "id:desc"
      where: {users_permissions_user: $user, id_medicament: $id_details}
    ) {
      id
      id_medicament
      last_dose
      medicament
      posologia
      dosis
      period
      notation
    }
  }
`;

export const CONSULT_HYSTORY_MEDICAMENTS_APP = gql`
  query medicaments($user: ID!, $mascot: ID!) {
    medicaments(
      sort: "last_dose:desc"
      where: {mascot: $mascot, users_permissions_user: $user}
    ) {
      id
      id_medicament
      last_dose
    }
  }
`;

export const CONSULT_HISTORY_VACCINATIONS_APP = gql`
  query vacunacions($user: ID!, $mascot: ID!) {
    vacunacions(
      sort: "last_vaccination:desc"
      where: {mascot: $mascot, users_permissions_user: $user}
    ) {
      id
      id_vaccination
      last_vaccination
    }
  }
`;

export const CONSULT_HISTORY_DEWORMING_APP = gql`
  query desparacitacions($mascot: ID!, $user: ID!) {
    desparacitacions(
      sort: "last_deworming:desc"
      where: {mascot: $mascot, users_permissions_user: $user}
    ) {
      id
      id_deworming
      last_deworming
    }
  }
`;

export const CONSULT_HISTORY_DOCTOR_APP = gql`
  query controllerMedics($user: ID!, $mascot: ID!) {
    controllerMedics(
      sort: "last_control:desc"
      where: {mascot: $mascot, users_permissions_user: $user}
    ) {
      id
      id_medic
      last_control
    }
  }
`;

export const CONSULT_SEARCH_FILTER_VACCINATIONS = gql`
  query vacunacions($user: ID!, $search: String!) {
    vacunacions(
      where: {
        users_permissions_user: $user
        _or: [
          {last_vaccination_contains: $search}
          {medicaments_contains: $search}
          {note_contains: $search}
        ]
      }
    ) {
      id
      id_vaccination
      last_vaccination
    }
  }
`;

export const CONSULT_SEARCH_FILTER_MEDICAMENT = gql`
  query medicaments($user: ID!, $search: String!) {
    medicaments(
      where: {
        users_permissions_user: $user
        _or: [{last_dose_contains: $search}, {medicament_contains: $search}]
      }
    ) {
      id
      id_medicament
      last_dose
    }
  }
`;

export const CONSULT_SEARCH_FILTER_DOCTOR = gql`
  query controllerMedics($user: ID!, $search: String!) {
    controllerMedics(
      where: {
        users_permissions_user: $user
        _or: [{last_control_contains: $search}, {assesment_contains: $search}]
      }
    ) {
      id
      id_medic
      last_control
    }
  }
`;

export const CONSULT_SEARCH_FILTER_DEWORMING = gql`
  query desparacitacions($user: ID!, $search: String!) {
    desparacitacions(
      where: {
        users_permissions_user: $user
        _or: [
          {last_deworming_contains: $search}
          {medicament_contains: $search}
        ]
      }
    ) {
      id
      id_deworming
      last_deworming
      medicament
    }
  }
`;

export const CONSULT_NOTIFYCS_LIST = gql`
  query Notifycs($type: String!, $id: ID!) {
    notifycs(sort: "date_notify:asc", where: {id_user: $id, type: $type}) {
      id
      id_notify
      id_mascot
      id_user
      id_type
      date_notify
      date
      type
    }
  }
`;
