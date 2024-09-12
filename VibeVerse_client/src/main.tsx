import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import HomePage from './Components/HomePage.tsx'
import Register from './Components/Auth/Resgister.tsx'
import Login from './Components/Auth/Login.tsx'
import VideoWatch from './Components/Videos/VideoWatch.tsx'
import Profile from './Components/UserProfile/Profile.tsx'
import CreatePlaylist from './Components/Playlist/CreatePlaylist.tsx'
import UploadVideo from './Components/Videos/UploadVideo.tsx'
import UpdateAccount from './Components/UserProfile/UpdateAccount.tsx'
import UpdateCoverImage from './Components/UserProfile/UpdateCoverImage.tsx'
import UpdateAvatarImage from './Components/UserProfile/UpdateAvatarImage.tsx'
import CreateTweet from './Components/Tweets/CreateTweets.tsx'

const router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
       {/* <Route path="/" element={<HomePage/>}> */}
      <Route path="/home" element={<HomePage/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/profile/:userId" element={<Profile/>}/>
      <Route path="updateAccount" element={<UpdateAccount/>}/>
      <Route path="updateCoverImage" element={<UpdateCoverImage/>}/>
      <Route path="updateAvatarImage" element={<UpdateAvatarImage/>}/>
      <Route path="createplaylist" element={<CreatePlaylist/>}/>
      <Route path="createTweets" element={<CreateTweet/>}/>
      <Route path="upload" element={<UploadVideo/>}/>
      <Route path="watch/:videoId" element={<VideoWatch/>}>
        <Route path=":videoId" element={<VideoWatch/>}/>
      </Route>
      {/* <Route path="videos/userId" element={<UserVideos/>}/> */}
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
