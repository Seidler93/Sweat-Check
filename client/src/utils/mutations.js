import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        username
        _id
      }
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: UserInput) {
    addUser(input: $input) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($commentInput: CommentInput!) {
    addComment(commentInput: $commentInput) {
      _id
      comments {
        _id
        username
        commentText
        userId
      }
      postText
    }
  }
`;

export const CREATE_WORKOUT = gql`
  mutation CreateWorkout($workoutInput: WorkoutInput) {
    createWorkout(workoutInput: $workoutInput) {
      _id
      originalId
      userId
      name
      description
      dateCompleted
      template
      workout {
        exercises {
          exerciseName
          sets {
            reps
            weight
            completed
          }
        }
      }
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout($workoutId: ID, $updatedWorkout: WorkoutInput) {
    updateWorkout(workoutId: $workoutId, updatedWorkout: $updatedWorkout) {
      _id
      name
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($workoutId: ID, $userId: ID) {
    deleteWorkout(workoutId: $workoutId, userId: $userId) {
      _id
      userId
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation Mutation($senderId: ID!, $text: String!, $conversationId: ID!) {
    sendMessage(senderId: $senderId, text: $text, conversationId: $conversationId) {
      text
      sender {
        username
        _id
      }
    }
  }
`;
