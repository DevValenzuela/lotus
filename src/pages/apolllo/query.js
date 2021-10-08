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
