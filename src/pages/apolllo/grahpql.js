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

export const DELETE_MASCOT_APP = gql`
  mutation deleteMascot($id: ID!) {
    deleteMascot(input: {where: {id: $id}}) {
      mascot {
        id
      }
    }
  }
`;

export const CREATE_MEDICAMENT_APP = gql`
  mutation createMedicament(
    $last_dose: String!
    $medicament: String!
    $posologia: String
    $dosis: String
    $period: String
    $notation: String
    $mascot: ID
    $user: ID
  ) {
    createMedicament(
      input: {
        data: {
          last_dose: $last_dose
          medicament: $medicament
          posologia: $posologia
          dosis: $dosis
          period: $period
          notation: $notation
          mascot: $mascot
          users_permissions_user: $user
        }
      }
    ) {
      medicament {
        id
      }
    }
  }
`;

export const CREATE_CONTROLLER_MEDIC_APP = gql`
  mutation createControllerMedict(
    $last_control: String!
    $assesment: String
    $note: String
    $mascot: ID
    $user: ID
  ) {
    createControllerMedict(
      input: {
        data: {
          last_control: $last_control
          assesment: $assesment
          note: $note
          mascot: $mascot
          users_permissions_user: $user
        }
      }
    ) {
      controllerMedict {
        id
      }
    }
  }
`;

export const CREATE_DESPARACITACION_APP = gql`
  mutation createDesparacitacion(
    $last_deworming: String!
    $medicament: String
    $note: String
    $mascot: ID
    $user: ID
  ) {
    createDesparacitacion(
      input: {
        data: {
          last_deworming: $last_deworming
          medicament: $medicament
          note: $note
          users_permissions_user: $user
          mascot: $mascot
        }
      }
    ) {
      desparacitacion {
        id
      }
    }
  }
`;

export const CREATE_VACCINATION_APP = gql`
  mutation createVacunacion(
    $last_vaccination: String!
    $medicament: String
    $note: String
    $mascot: ID
    $user: ID
  ) {
    createVacunacion(
      input: {
        data: {
          last_vaccination: $last_vaccination
          medicaments: $medicament
          note: $note
          mascot: $mascot
          users_permissions_user: $user
        }
      }
    ) {
      vacunacion {
        id
      }
    }
  }
`;

export const UPDATE_CONTROLLER_MEDIC = gql`
  mutation updateControllermedic(
    $id: ID!
    $last_control: String
    $assessment: String
    $note: String
  ) {
    updateControllerMedict(
      input: {
        data: {last_control: $last_control, assesment: $assessment, note: $note}
        where: {id: $id}
      }
    ) {
      controllerMedict {
        id
      }
    }
  }
`;

export const UPDATE_MEDICAMENT_MEDIC = gql`
  mutation updateMedicament(
    $id: ID!
    $last_dose: String!
    $medicament: String
    $posologia: String
    $dosis: String
    $period: String
    $notation: String
  ) {
    updateMedicament(
      input: {
        data: {
          last_dose: $last_dose
          medicament: $medicament
          posologia: $posologia
          dosis: $dosis
          period: $period
          notation: $notation
        }
        where: {id: $id}
      }
    ) {
      medicament {
        id
      }
    }
  }
`;

export const UPDATE_VACCINATION_MEDIC = gql`
  mutation updateVacunacion(
    $id: ID!
    $last_vaccination: String
    $medicament: String
    $note: String
  ) {
    updateVacunacion(
      input: {
        data: {
          last_vaccination: $last_vaccination
          medicaments: $medicament
          note: $note
        }
        where: {id: $id}
      }
    ) {
      vacunacion {
        id
      }
    }
  }
`;

export const UPDATE_DEWORMING_MEDIC = gql`
  mutation updateDesparacitacion(
    $id: ID!
    $last_deworming: String!
    $medicament: String
    $note: String
  ) {
    updateDesparacitacion(
      input: {
        data: {
          last_deworming: $last_deworming
          medicament: $medicament
          note: $note
        }
        where: {id: $id}
      }
    ) {
      desparacitacion {
        id
      }
    }
  }
`;

export const UPDATE_PHOTO_MASCOT = gql`
  mutation updateMascot($id: ID!, $avatar_mascot: ID) {
    updateMascot(
      input: {data: {avatar_mascot: $avatar_mascot}, where: {id: $id}}
    ) {
      mascot {
        id
      }
    }
  }
`;

export const UPDATE_GENERAL_MASCOT = gql`
  mutation updateMascot(
    $id: ID!
    $type_mascot: String
    $race_mascot: String
    $date_sterilized: String
    $number_microchip: String
    $description: String
    $microchip: String
  ) {
    updateMascot(
      input: {
        data: {
          type_mascot: $type_mascot
          race_mascot: $race_mascot
          date_sterilized: $date_sterilized
          number_microchip: $number_microchip
          description: $description
          microchip: $microchip
        }
        where: {id: $id}
      }
    ) {
      mascot {
        id
      }
    }
  }
`;
