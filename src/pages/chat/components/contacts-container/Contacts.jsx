import React, { useEffect } from 'react'
import ProfileInfoComponent from './components/ProfileInfoComponent'
import NewDm from './components/NewDm'
import { apiClient } from '@/lib/api-client'
import { GETDMCONTACTROUTES } from '@/utils/constants'
import { useAppStore } from '@/store'
import ContactList from './components/ContactList'

const Contacts = () => {
    const {setDmContacts, dmContacts} = useAppStore();

    useEffect(() => {
      const getContacts = async ()=> {
        const response = await apiClient.get(GETDMCONTACTROUTES, {withCredentials: true});
        if(response.data.contacts){
            setDmContacts(response.data.contacts)
        }
      }
    
      getContacts()
    }, [])
    

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
        <div className="pt-3">
            <Logo />
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between pr-10">
                <Title text="Direct Messages" />
                <NewDm />
            </div>
            <div className='max-h-[34vh] overflow-y-auto scrollbar-hidden'>
                <ContactList contacts={dmContacts} />
            </div>
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between pr-10">
                <Title text="Channels" />
            </div>
        </div>
        <ProfileInfoComponent />
    </div>
  )
}

export default Contacts

const Logo = () => {
    return (
        <div className='flex p-5 justify-start gap-2'>
            Chat App
        </div>
    )
}

const Title = ({text}) =>{
    return (
        <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>{text}</h6>
    )
}