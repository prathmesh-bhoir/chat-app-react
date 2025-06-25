import { useAppStore } from '@/store';
import moment from 'moment';
import React, { useEffect, useRef } from 'react'

const MessageContainer = () => {

  const scrollRef = useRef();
  const {selectedChatType, selectedChatData, userInfo, selectedChatMessages} = useAppStore();

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
            <div className='text=center text-gray-500 my-2'>
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
      return (
      <div className={``}> 

      </div>
    )
  }

  return (
    <div className='flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef}/>
    </div>
  )
}
export default MessageContainer