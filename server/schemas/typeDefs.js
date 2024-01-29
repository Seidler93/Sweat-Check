const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    friends: [User]
    status: Status
    workouts: [Workout]    
    programs: [Program]
    posts: [Post]
    conversations: [Conversation]
  }

  input UserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
  }

  type Message {
    text: String
    sender: User
  }

  type Conversation {
    _id: ID
    messages: [Message]
  }

  type Friend {
    _id: ID
    userId: ID
    friend: FriendInfo
    state: String
    info: User
  }

  type FriendInfo {
    username: String
    friendId: ID
  }

  input FriendRequestInput {
    userId: ID
    friend: FriendInfoInput
    state: String
  }

  input FriendInfoInput {
    username: String
    friendId: String
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
    sets: [Set]
  }

  type Set {
    reps: Int
    weight: Int
    completed: Boolean
  }

  input WorkoutInput {
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
    sets: [SetInput]
  }

  input SetInput {
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
    homePage(_id: ID!): User
    me: User
    getAllWorkouts: [Workout]
    getWorkoutsByUserId(userId: ID!): [Workout]
    getWorkoutById(_id: ID!): Workout
    getFriendsByUserId(userId: ID!): [Friend]
    getConversations: [Conversation]
    getConversationById(_id: ID): Conversation
    getMyConversations(_id: ID): User
  }

  type Mutation {
    addUser(input: UserInput): Auth
    login(email: String!, password: String!): Auth
    createWorkout(workoutInput: WorkoutInput): Workout
    updateWorkout(workoutId: ID, updatedWorkout: WorkoutInput): Workout
    deleteWorkout(workoutId: ID, userId: ID): Workout
    friendRequest(friendRequest: FriendRequestInput): User
    setStatus(userId: ID, statusName: String, checkInTime: String ): User
    sendMessage(conversationId: ID!, text: String!, senderId: ID!): Message
    createConversation(receiverId: ID!, senderId: ID!): Conversation
  }

  type Subscription {
    messageSent(conversationId: ID!): Message
  }
`;

module.exports = typeDefs;
