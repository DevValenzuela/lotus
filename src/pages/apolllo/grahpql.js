import {gql} from '@apollo/client';

export const REGISTER_USER_APP = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(input: {email: $email, username: $username, password: $password}) {
      user {
        id
        username
        email
      }
      jwt
    }
  }
`;

export const LOGIN_USER_APP = gql`
  mutation login($slug: String!, $password: String!) {
    login(input: {identifier: $slug, password: $password}) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const RECOVERY_USER_APP = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;

export const ADD_MASCOT_APP = gql`
  mutation createMascot(
    $name_mascot: String!
    $age_mascot: Int!
    $type_mascot: String
    $race_mascot: String
    $date_sterilized: String
    $number_microchip: String
    $description: String
    $avatar_mascot: ID
    $user: ID
    $microchip: String!
    $sterilized: String!
  ) {
    createMascot(
      input: {
        data: {
          name_mascot: $name_mascot
          age_mascot: $age_mascot
          type_mascot: $type_mascot
          race_mascot: $race_mascot
          date_sterilized: $date_sterilized
          sterilized: $sterilized
          microchip: $microchip
          number_microchip: $number_microchip
          description: $description
          avatar_mascot: $avatar_mascot
          users_permissions_user: $user
        }
      }
    ) {
      mascot {
        id
        name_mascot
        sterilized
        date_sterilized
        users_permissions_user {
          id
        }
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUser(
    $id: ID!
    $username: String
    $email: String
    $avatar: ID
  ) {
    updateUser(
      input: {
        where: {id: $id}
        data: {username: $username, email: $email, avatar: $avatar}
      }
    ) {
      user {
        id
      }
    }
  }
`;

export const UPLOAD_PHOTO_MASCOT = gql`
  mutation ($file: Upload!) {
    upload(file: $file) {
      id
      name
    }
  }
`;

export const DELETE_PHOTO_MASCOT = gql`
  mutation deleteFile($inputId: InputID) {
    deleteFile(input: {where: $inputId}) {
      file {
        id
      }
    }
  }
`;
