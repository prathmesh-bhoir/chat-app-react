import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { GETALLMESSAGESROUTE } from '@/utils/constants';
import moment from 'moment';
import React, { useEffect, useRef } from 'react'

const MessageContainer = () => {

  const scrollRef = useRef();
  const {selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages} = useAppStore();

  useEffect(() => {
    const getMessages = async() => {
      try {
        const response = await apiClient.post(GETALLMESSAGESROUTE,{id: selectedChatData._id}, {withCredentials:true});
        if(response.data.messages){
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error)
      }
    };
    if(selectedChatData._id){
      if(selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages])
  

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior: "smooth"});
    }
  
  }, [selectedChatMessages])
  

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message)=>{
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {showDate && (
            <div className='text-center text-gray-500 my-2'>
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {
            selectedChatType === "contact" && renderDMMessages(message)
          }
        </div>
      )
    });
  };
  const renderDMMessages = (message) => {
    return(
      <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
        {message.messageType==="text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#B417ff]/5 text-[#B417ff]/90 border-[#B417ff]/50"
              : "bg-[#2a2b33]/5 text-white/90 border-[#ffffff]/50"
          } border inline-block p-1.75 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
        )}
        <div className="text-[0.6rem] text-gray-600">
           {moment(message.timestamp).format("LT")}
        </div>
      </div>
    )
  }

  return (
    // <div>
      <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
        <div ref={scrollRef}/>
      </div>
    
  )
}
export default MessageContainer