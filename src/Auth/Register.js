import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constant';

import { useNavigate } from 'react-router-dom';
import {Button, useToast } from '@chakra-ui/react';
import { DataState } from '../context/Provider';
const Register = () => {
  let navigate = useNavigate()
  const [name,setName]=useState('');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [re_pasword,setRe_password]=useState('')
  const [pic,setPic]=useState();
  const [loading,setLoading]=useState(false);
  const toast = useToast();
  const {setUser}=DataState();
  const submitHandler=async()=>{
    setLoading(true)
    if(!name||!email||!password||!re_pasword){
      toast({
        title:"Fill all the Fields",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
      setLoading(false)
    }
    if(password!==re_pasword){
      toast({
        title:"Password does not match",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }
    try {
      const config = {
        headers:{
          "Content-type":"application/json",
        },
      }

      const {data}= await axios.post(`${BASE_URL}/users/register`,{name,email,password,pic},config);
      toast({
        title:"Registered successfully",
        status:"success",
        duration:3000,
        isClosable:true,
        position:"top"
    });
      localStorage.setItem('bookingUser',JSON.stringify(data));
      const bookingUser = JSON.parse(localStorage.getItem("bookingUser"));
      setUser(bookingUser);
      setLoading(false)
      navigate('/home')
    } catch (error) {
      toast({
        title:"Some thing went Wrong",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }
   
  }
  const postDetails=(pics)=>{
    setLoading(true);
    if(pics===undefined){
      toast({
        title:"Please set the Image",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top"
    });
    }
    if(pics.type==="image/jpeg"||pics.type==="image/png"){
      const data = new FormData();
      data.append("file",pics);
      data.append('upload_preset','chat-app');
      data.append("cloud_name","dr85pdowh");
      fetch('https://api.cloudinary.com/v1_1/dr85pdowh/image/upload',{
        method:"post",
        body:data,
      }).then((res)=>res.json())
      .then((data)=>{
        setPic(data.url.toString());
        console.log(data);
        setLoading(false)
        
      })
      .catch(err=>{
        console.log(err);
        setLoading(false);
        
      })
    }else{
      alert('Please Select Image')
    }
  }
  return <>
     <div className="mb-2">
        <label  className="form-label">Name</label>
         <input type="text" className="form-control" placeholder="Your Name" onChange={(e)=>setName(e.target.value)} required/>
     </div>
     <div className="mb-2">
        <label  className="form-label">Email Address</label>
         <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" required/>
     </div>
       <label  class="form-label mt-1">Create Password</label>
      <input type="password" placeholder='Enter Password'  class="form-control"onChange={(e)=>setPassword(e.target.value)}  required/>
      <label for="inputPassword5" className="form-label mt-1">Confirm Password</label>
      <input type="password" placeholder='Re-enter Password'  class="form-control"onChange={(e)=>setRe_password(e.target.value)}  required/>
      <div class="mb-3">
        <label for="formFile" className="form-label">Set Profile Image</label>
        <input class="form-control" type="file" onChange={(e)=>postDetails(e.target.files[0])} id="formFile"/>
      </div>
      <div className='d-grid gap-2 col-6 mx-auto mt-4'>
        <Button
      isLoading={loading}
      loadingText='Loading..'
      colorScheme='purple'
      
      onClick={()=>submitHandler()}
    >
      Register
    </Button>
    
      </div>
  
  </>
}

export default Register
