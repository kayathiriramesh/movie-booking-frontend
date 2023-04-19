import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { DataState } from '../context/Provider';
import ProfileModel from './ProfileModel';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const {user,setUser,setLocation}=DataState()
  let logout = ()=>{

    localStorage.removeItem('bookingUser')
    setUser('');
    navigate("/")

  }
  return <>
  <div className='contain'>
     <Box
     d="flex"
     justifyContent="space-between"
     alignItems="center"
     w="100%"
     pb={2}
     pr={3}
    bg="#0E1749"
     >
         
          <div className='title-home'>
            <div className='t'>
            <p>Book<span>M</span>y<span>T</span>ickets </p>
            <select onChange={(e)=>setLocation(e.target.value)}>
              <option>Location</option>
              <option >Mumbai</option>
              <option >Delhi</option>
              <option >Chennai</option>
              <option >Bangalore</option>
            </select>
            
            </div>
                    
          </div>
      
        <div style={{marginRight:"70px"}}>
          <Menu>
          <Tooltip hasArrow label='Search places' bg='gray' color='white'>
            <Link to="/search">
          <MenuButton fontSize="25px" p={1} pr={6} pt={2}>
       
          <i className="fa-solid fa-magnifying-glass" style={{color:"white"}} ></i>
         
              
                 {/* <span className="tickets">{tickets.length}</span> */}
            </MenuButton>
            </Link>
            </Tooltip>
          </Menu>
             <Menu>
             <Link to="/tickets">
             <Tooltip hasArrow label='View Tickets' bg='gray' color='white'>
                 <MenuButton p={1} pr={6}>
                   <h3 style={{fontSize:"20px",color:"white"}}><i className="fa-solid fa-ticket" style={{color:"red",fontSize:"18px",marginRight:"10px"}}></i>Tickets</h3>
                 
                 {/* <span className="tick-count">{tickets.length}</span> */}
                 </MenuButton>
                
                 {/* <MenuList pl={2}>
                     {!tickets.length && "No Tickets"}
                    
                 </MenuList> */}
                 </Tooltip>
                 </Link>
             </Menu>
             <Menu p="-10px">
                 <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size="sm"
                     cursor="pointer"
                      src={user?user.pic:""}
                      />  
                 </MenuButton>
                 <MenuList>
                
                   <ProfileModel>
                   <MenuItem> My Profile</MenuItem>
                 </ProfileModel>
                  <MenuItem onClick={()=>logout()} >LogOut</MenuItem>

                 </MenuList>
             </Menu>
         </div>

     </Box>
  </div>
  </>
}

export default Header