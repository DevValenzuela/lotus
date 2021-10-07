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
