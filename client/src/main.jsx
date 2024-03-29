import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './pages/HomePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ConversationsPage from './pages/ConversationsPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import MyProfilePage from './pages/MyProfilePage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import StorePage from './pages/StorePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import MyStatsPage from './pages/MyStatsPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CreateWorkoutPage from './pages/CreateWorkoutPage.jsx';
import ProgramPage from './pages/ProgramPage.jsx';
import WorkoutPage from './pages/WorkoutPage.jsx'
import ExercisePage from './pages/ExercisePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NewWorkoutPage from './pages/NewWorkoutPage.jsx';
import MyWorkoutsPage from './pages/MyWorkoutsPage.jsx'
import FriendProfilePage from './pages/FriendProfilePage.jsx';
import Conversation from './pages/Conversation.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: '/conversations', element: <ConversationsPage /> },       
      { path: '/conversation/:conversationId', element: <Conversation /> },       
      { path: '/calendar', element: <CalendarPage /> },       
      { path: '/profile/me', element: <MyProfilePage /> },       
      { path: '/profile/:friendId', element: <FriendProfilePage /> },       
      { path: '/myWorkouts/:myWorkouts', element: <MyWorkoutsPage /> },       
      { path: '/myPrograms', element: <LibraryPage /> },       
      { path: '/store', element: <StorePage /> },
      { path: '/createWorkout', element: <CreateWorkoutPage /> },
      { path: '/:programId/:workoutId', element: <ProgramPage /> },
      { path: '/workout/:workoutId', element: <WorkoutPage /> },
      { path: '/store/:productId', element: <ProductPage /> },
      { path: '/myStats', element: <MyStatsPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/exercise', element: <ExercisePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/newWorkoutPage', element: <NewWorkoutPage /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

