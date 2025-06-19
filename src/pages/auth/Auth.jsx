import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import { LOGINROUTE, SIGNUPROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

const Auth = () => {

  const navigate = useNavigate()
  const {setUserInfo} = useAppStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateLogin = () => {
    if(!email.length) {
      toast.error("Email is required");
      return false
    }
    if(!password.length) {
      toast.error("Password is required");
      return false
    }

    return true
  }

  const validateSignup = () => {
    if(!email.length) {
      toast.error("Email is required");
      return false
    }
    if(!password.length) {
      toast.error("Password is required");
      return false
    }
    if(password !== confirmPassword) {
      toast.error("Password and confirm password should be same");
      return false
    }
    return true;
  }

  const handleLogin = async () =>{
    if(validateLogin()){
      const response = await apiClient.post(LOGINROUTE, {email,password}, {withCredentials: true})
 
      if(response.data.user.profileSetup){
        navigate('/chat');
      }else{
        setUserInfo(response.data.user)
        navigate('/profile');
      }
    }
  } 
  const handleSignup = async () =>{
    if(validateSignup()){
      const response = await apiClient.post(SIGNUPROUTE, {email,password}, {withCredentials: true})

      if(response.status===200){
        setUserInfo(response.data.user)
        navigate('/profile');
      }
    }
  } 


  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className='h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl md:w-[90vw] lg:w-[70vw] xl:w-[60] grid xl:grid-cols-2'>
          <div className='flex flex-col gap-10 items-center justify-center'>
              <div className='flex items-center justify-center flex-col'>
                <div className='flex items-center justify-center'>
                  <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
                </div>
                <p className='font-small text-center mt-5 text-gray-600'>Fill in the details to get started with the best chat app</p>
              </div>
              <div className='flex items-center justify-center w-full'>
                <Tabs className='w-3/4' defaultValue='login'>
                  <TabsList className='bg-transparent rounded-none w-full'>
                    <TabsTrigger value="login"
                      className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-1/2 data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                    >Login</TabsTrigger>
                    <TabsTrigger value="signup"
                      className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-1/2 data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                    >Signup</TabsTrigger>
                  </TabsList>
                  <TabsContent className='flex flex-col gap-5 mt-5' value="login">
                    <Input 
                    className='rounded-full p-6'
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Input 
                    className='rounded-full p-6'
                    type="password" 
                    placeholder="Set Password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button className='rounded-full p-6 cursor-pointer' onClick={handleLogin}>Login</Button>
                  </TabsContent>
                  <TabsContent  className='flex flex-col gap-5 mt-5' value="signup">
                    <Input 
                    className='rounded-full p-6'
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Input 
                    className='rounded-full p-6'
                    type="password" 
                    placeholder="Set Password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Input 
                    className='rounded-full p-6'
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <Button className='rounded-full p-6 cursor-pointer' onClick={handleSignup}>Signup</Button>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Auth