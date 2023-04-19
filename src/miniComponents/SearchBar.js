import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { DataState } from '../context/Provider'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    const [search,setSearch] = useState('');
    const {movies,setSelectedmovie}=DataState();

  return <>
    <Box
   d="flex"
   justifyContent="space-between"
   alignItems="center"
   w="100%"
   p={5}
   bg="#e1e2e3"
  >
  <div className='left-arrow'>
      <Link to="/home"><i class="fa-solid fa-arrow-left-long"></i></Link>
     
  </div>
  <div>
            <input 
                 placeholder="Search for movies,Events, Activities.."
                 mr={2}
                 className="search-input"
                 onChange={(e)=>setSearch(e.target.value)}
               />
  </div>
  <div className='close-btn'>
      <Link to="/home"> <i class="fa-solid fa-xmark"></i></Link>
  </div>
  </Box>
           <div className='search-items'>
           {  movies.filter(val=>val.movieName.toLowerCase().includes(search.toLowerCase())).map((e,i)=>{
                 return <div key={e._id} className="main-cards" onClick={()=>setSelectedmovie(e)}>
                   <Link to='/details'>
                       <div class="card mb-3">
                        <img src={e.poster} class="card-img-top" alt="...poster"/>
                        <div class="card-body">
                            <h5 class="card-title">{e.movieName}</h5>
                            <p class="card-text">{e.type}<span className='heart'><i class="fa-solid fa-heart"></i>&nbsp;85%</span></p>
                            <p class="card-text"><small class="text-muted">{e.language}</small>
                            
                            </p>
                        </div>
                        </div> </Link>
                       
                    </div> })
            }
           </div>
       
  </>
}

export default SearchBar