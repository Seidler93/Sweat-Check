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
