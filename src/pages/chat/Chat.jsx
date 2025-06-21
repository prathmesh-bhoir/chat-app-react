import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Contacts from './components/contacts-container/Contacts';
import EmptyChat from './components/EmptyChat';
import ChatContainer from './components/chat-container/ChatContainer';



const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please setup profile to continue.")
      navigate("/profile")
    }
  },[userInfo, navigate])

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <Contacts />
      {/* <EmptyChat /> */}
      <ChatContainer /> 
    </div>
  ) 
}

export default Chat