import { gql } from '@apollo/client';
       
export const QUERY_POSTS_BY_USER_ID = gql`
  query getAllPostsOfUser($_id: ID!) {
    getAllPostsOfUser(_id: $_id) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($_id: ID!) {
    getSinglePost(_id: $_id) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      postText
      mediaUrl
      userId
      username
      visibility
      createdAt
      workoutId
      workoutName
      comments {
        _id
        username
        commentText
        createdAt
        userId
      }
    }
  }
`;


export const QUERY_ORIGINAL_WORKOUT = gql`
query getWorkoutsByOriginalId($originalId: ID!) {
  getWorkoutsByOriginalId(originalId: $originalId) {
    _id
    originalId
    userId
    name
    description
    workout {
      phase
      exercises {
        exercise {
          name
        }
        sets {
          reps
          weight
        }
      }
    }
  }
}
`;

export const QUERY_GET_ALL_PROGRAMS = gql`
  query GetAllPrograms {
    getAllPrograms {
      _id
    }
  }
`;

export const QUERY_SEARCH = gql`
  query Search {
    getAllPrograms {
      _id
    }
  }
`;

export const QUERY_USER_WITH_WORKOUT_INFO = gql`
  query GetUserWithWorkoutInfo($id: ID!) {
    getUserWithWorkoutInfo(_id: $id) {
      _id
      workouts {
        _id
      }
      programs {
        _id
      }
    }
  }
`;
 
export const QUERY_PUBLIC_WORKOUTS = gql`
  query GetAllPublicWorkouts($originalId: String) {
    getAllPublicWorkouts(originalId: $originalId) {
      _id
      originalId
      name
      description
      workout {
        phase
        exercises {
          exercise {
            name
          }
          sets {
            reps
            weight
          }
        }
      }
    }
  }
`;


export const QUERY_PUBLIC_PROGRAMS = gql`
query GetAllPublicPrograms($originalId: String) {
  getAllPublicPrograms(originalId: $originalId) {
    _id
    originalId
    userId
    name
    description
    duration
    workouts {
      day
      workout
    }
  }
}
`;
export const QUERY_WORKOUTS_BY_USER = gql`
  query GetWorkoutsByUserId($userId: ID!) {
    getWorkoutsByUserId(userId: $userId) {
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

export const QUERY_WORKOUT_BY_ID = gql`
  query GetWorkoutById($id: ID!) {
    getWorkoutById(_id: $id) {
      _id
      originalId
      name
      userId
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

export const QUERY_FRIENDS_BY_ID = gql`
  query GetFriendsByUserId($userId: ID!) {
    getFriendsByUserId(userId: $userId) {
      user
      friend {
        username
        _id
      }
      _id
      state
    }
  }
`;

export const QUERY_HOMEPAGE_USER = gql`
  query HomePage($id: ID!) {
    homePage(_id: $id) {
      username
      friends {
        username
        status {
          statusName
        }
        _id
      }
      status {
        statusName
        checkInTime
      }
      workouts {
        _id
        originalId
        userId
        name
        description
        dateCompleted
        template
        workout {
          exercises {
            sets {
              reps
              weight
              completed
            }
            exerciseName
          }
        }
      }
      programs {
        workouts {
          workout
          day
        }
        duration
        description
        name
        userId
        originalId
        _id
      }
      posts {
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
        username
      }
      conversations {
        _id
        senderId
        receiverId
      }
    }
  }
`;

export const GET_CONVERSATION_QUERY = gql`
  query GetConversationById($id: ID) {
    getConversationById(_id: $id) {
      _id
      messages {
        text
        sender {
          _id
          username
        }
      }
    }
  }
`;

export const GET_MY_CONVERSATIONS_QUERY = gql`
  query GetMyConversations($id: ID) {
    getMyConversations(_id: $id) {
      conversations {
        _id
        messages {
          sender {
            username
            _id
          }
          text
        }
      }
    }
  }
`;


