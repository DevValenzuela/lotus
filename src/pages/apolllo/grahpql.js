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