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

export const CONSULT_MASCOT_APP_ID = gql`
  query mascot($id: ID!) {
    mascot(id: $id) {
      id
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
      sort: "last_deworming:desc"
      limit: 1
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      last_deworming
      medicament
      note
    }
  }
`;

export const CONSULT_VACCINATIONS_APP = gql`
  query Vacunacions($user: ID!, $mascot: ID!) {
    vacunacions(
      sort: "last_vaccination:desc"
      limit: 1
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      last_vaccination
      medicaments
      note
    }
  }
`;

export const CONSULT_CONTROLLER_MEDICS_APP = gql`
  query ControllerMedicts($user: ID!, $mascot: ID!) {
    controllerMedicts(
      sort: "last_control:desc"
      limit: 1
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
      last_control
      assesment
      note
    }
  }
`;

export const CONSULT_MEDICAMENT_APP = gql`
  query medicaments($user: ID!, $mascot: ID!) {
    medicaments(
      sort: "last_dose:desc"
      where: {users_permissions_user: $user, mascot: $mascot}
    ) {
      id
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
      last_deworming
    }
  }
`;

export const CONSULT_HISTORY_MEDICAMENT_APP = gql`
  query medicaments($user: ID!, $mascot: ID!) {
    medicaments(
      sort: "last_dose:desc"
      where: {mascot: $mascot, users_permissions_user: $user}
    ) {
      id
      last_dose
    }
  }
`;

export const CONSULT_SEARCH_FILTER_VACCINATIONS = gql`
  query vacunacions($search: String!) {
    vacunacions(
      where: {
        _or: [
          {last_vaccination_contains: $search}
          {medicaments_contains: $search}
          {note_contains: $search}
        ]
      }
    ) {
      id
      last_vaccination
      medicaments
      note
    }
  }
`;
