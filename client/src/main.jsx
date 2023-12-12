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
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

