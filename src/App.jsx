import React, { Children, useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'
import { useAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GETUSER } from './utils/constants'

const PrivateRoute = ({children}) =>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : < Navigate to='/auth' />;
}

const AuthRoute = ({children}) =>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? < Navigate to='/chat'/> : children; 
}

const App = () => {

  const {userInfo,setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () =>{
      try {
        const response = await apiClient.get(GETUSER, {withCredentials: true,});
        if(response.status === 200){
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined)
        }
        console.log({response})
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    } 

    if(!userInfo){
      getUser()
    }else {
      setLoading(false);
    }
  
  }, [userInfo,setUserInfo])
  
  if(loading){
    <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth' element={<AuthRoute> <Auth /> </AuthRoute>} />
        <Route path='chat' element={<PrivateRoute> <Chat /> </PrivateRoute>} />
        <Route path='profile' element={<PrivateRoute> <Profile /> </PrivateRoute>} />
        <Route path='*' element={<Navigate to='/Auth' />} />
      </Routes>    
    </BrowserRouter>
  )
}

export default App