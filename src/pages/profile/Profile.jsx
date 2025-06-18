import { useAppStore } from '@/store'
import React, { useState } from 'react'

const Profile = () => {
  const {userInfo, setUserInfo} = useAppStore()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [color, setColor] = useState(0)

  const saveChanges = async () => {

  }

  return (
    <div>
    </div>
  )
}

export default Profile