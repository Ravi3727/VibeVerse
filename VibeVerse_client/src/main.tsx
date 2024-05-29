import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import HomePage from './Components/HomePage.tsx'
import Register from './Components/Auth/Resgister.tsx'
import Login from './Components/Auth/Login.tsx'
import VideoWatch from './Components/Videos/VideoWatch.tsx'
import Profile from './Components/UserProfile/Profile.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<HomePage/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="watch/" element={<VideoWatch/>}>
        <Route path=":videoId" element={<VideoWatch/>}/>
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
