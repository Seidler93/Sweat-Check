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
import JustWorkoutPage from './pages/JustWorkoutPage.jsx';
import ProgramPage from './pages/ProgramPage.jsx';
import WorkoutPage from './pages/WorkoutPage.jsx'
import ExercisePage from './pages/ExercisePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NewWorkoutPage from './pages/NewWorkoutPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: '/conversations', element: <ConversationsPage /> },       
      { path: '/calendar', element: <CalendarPage /> },       
      { path: '/profile/me', element: <MyProfilePage /> },       
      { path: '/library', element: <LibraryPage /> },       
      { path: '/store', element: <StorePage /> },
      { path: '/createWorkout', element: <CreateWorkoutPage /> },
      { path: '/justWorkout', element: <JustWorkoutPage /> },
      { path: '/:programId/:workoutId', element: <ProgramPage /> },
      { path: '/workout/:workoutId', element: <WorkoutPage /> },
      { path: '/store/:productId', element: <ProductPage /> },
      { path: '/myStats', element: <MyStatsPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/exercise', element: <ExercisePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/newWorkoutPage', element: <NewWorkoutPage /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

