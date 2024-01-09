const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    friends: [Friend]
    status: Status
    workouts: [Workout]    
    programs: [Program]
    posts: [Post]
  }

  input UserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
  }

  type Friend {
    _id: ID
    user: ID
    friend: User
  }

  type Workout {
    _id: ID
    originalId: ID
    userId: String
    name: String
    description: String
    dateCompleted: String
    template: Boolean
    workout: [SuperSet]
  }

  type SuperSet {
    exercises: [Exercises]
  }

  type Exercises {
    exerciseName: String
    sets: [SetsReps]
  }

  type SetsReps {
    reps: Int
    weight: Int
    completed: Boolean
  }

  input CreateWorkoutInput {
    originalId: ID
    userId: String
    name: String
    description: String
    dateCompleted: String
    template: Boolean
    workout: [SuperSetInput]
  }

  input SuperSetInput {
    exercises: [ExerciseInput]
  }

  input ExerciseInput {
    exerciseName: String
    sets: [SetsRepsInput]
  }

  input SetsRepsInput {
    reps: Int
    weight: Int
    completed: Boolean
  }

  type Program {
    _id: ID!
    originalId: ID
    userId: ID
    name: String!
    description: String
    duration: String
    workouts: [ProgramWorkout]
  }

  type ProgramWorkout {
    day: String!
    workout: String!
  }

  type Status {
    statusName: String
    checkInTime: String
  }

  type Post {
    username: String
    userId: String
    workoutId: String
    workoutName: String
    mediaUrl: String
    postText: String
    createdAt: String
    visibility: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput): Auth
    login(email: String!, password: String!): Auth
    createWorkout(workoutInput: CreateWorkoutInput): Workout
  }
`;

module.exports = typeDefs;
