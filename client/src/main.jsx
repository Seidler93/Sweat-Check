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
      { path: '/createWorkout', element: <StorePage /> },
      { path: '/justWorkout', element: <StorePage /> },
      { path: '/programId/workoutId', element: <StorePage /> },
      { path: '/workoutId', element: <StorePage /> },
      { path: '/store/productId', element: <ProductPage /> },
      { path: '/myStats', element: <MyStatsPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

