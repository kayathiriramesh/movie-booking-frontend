import React from 'react'
import { DataState } from '../context/Provider'

const Profile = () => {
    const {user} = DataState();
    console.log(user);
  return (
    <div>Profile</div>
  )
}

export default Profile