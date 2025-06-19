import { useAppStore } from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {IoArrowBack} from "react-icons/io5";
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { colors, getColor } from '@/lib/utils';
import {FaPlus, FaTrash} from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import { ADDPROFILEIMAGEROUTE, DELETEPROFILEIMAGEROUTE, HOST, UPDATEPROFILEROUTE } from '@/utils/constants';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [color, setColor] = useState(0)
  const fileInputRef = useRef(null)

  useEffect(() => {
    console.log(userInfo)
    if(userInfo.profilSetup){
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setColor(userInfo.color)
    }
    if(userInfo.image){
      setImage(`${HOST}/${userInfo.image}`)
    }
  }, [userInfo]);
  
  const handleNavigate = () => {
    if(userInfo.profilSetup){
      navigate('/chat')
    }else{
      toast.error("Please setup profile.")
    }
  };

  const validateChanges = () => {
    if(!firstName) return toast.error("First name is required.")
    if(!lastName) return toast.error("Last name is required.")

    return true
  }

  const saveChanges = async () => {
    if(validateChanges()){
      try {
        const response = await apiClient.post(UPDATEPROFILEROUTE, {firstName, lastName, color},
        {withCredentials: true}
        );
        if(response.data){
          setUserInfo({...response.data});
          toast.success("Profile updated successfully");
          navigate('/chat')
        }
      } catch (error) {
        response.status(500).send("Internal server error")
      }
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if(file){
      const formData = new FormData();
      formData.append('profile-image', file);
      const response = await apiClient.post(ADDPROFILEIMAGEROUTE, formData, {withCredentials:true});
      if(response.data.image){
        setUserInfo({...userInfo, image:response.data.image})
        toast.success("Image updated successfully.")
      }
    }
  }

  const handleDeleteImage = async (event) => {
    try {
      const response = await apiClient.delete(DELETEPROFILEIMAGEROUTE, {withCredentials: true});

      if(response.data){
        setUserInfo({...userInfo, image: null})
        toast.success("Image removed successfully.")
        setImage(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div onClick={handleNavigate}>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer'/>
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 md:h-48 realative flex items-center justify-center' 
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}>
            <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
              {image ? (
                <AvatarImage src={image} alt='profile' className='object-cover w-full h-full bg-black' />
              ) : (
                <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(color)}`}>
                  {firstName 
                  ? firstName.split("").shift()
                : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {
              hovered && (
                <div className='absolute flex items-center justify-center bg-black/50 rounded-full'
                onClick={image ? handleDeleteImage : handleFileInputClick}>
                { image ? ( 
                  <FaTrash className='text-white text-3xl cursor-pointer' /> 
                ):(
                  <FaPlus className='text-white text-3xl cursor-pointer'/> 
                  )}
                </div>
            )}
            <input 
            type='file' 
            ref={fileInputRef} 
            className='hidden' 
            onChange={handleImageChange} name='profile-image' 
            accept='.png, .jpeg, .jpg, .svg'/> 
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
            <div className='w-full'>
              <Input 
              placeholder="First Name" type="text" 
              value={firstName} 
              onChange={(e)=>setFirstName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
            <div className='w-full'>
              <Input placeholder="Last Name" type="text" 
              value={lastName} 
              onChange={(e)=>setLastName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
            <div className='w-full flex gap-5'>
              {colors.map((clr,index)=> (
                <div 
                className={`${clr} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                ${
                  color === index 
                  ? "outline-1 outline-white "
                  : ""
                }}`}
                key={index}
                onClick={()=>setColor(index)}
                ></div>))
              }
            </div>
          </div>
        </div>
        <div className='w-full'>
            <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 cursor-pointer"
            onClick={saveChanges}
            >
              Save Changes
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile