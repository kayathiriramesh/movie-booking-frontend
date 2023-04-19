import axios from 'axios';
import React, { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProtectRoute from './Auth/ProtectRoute';
import Authtentication from './Components/Authtentication';
import BookingTicket from './Components/BookingTicket';
import HomePage from './Components/HomePage';
import MovieDetails from './Components/MovieDetails';
import MyTickets from './Components/MyTickets';
import { BASE_URL } from './constant';
import { DataState } from './context/Provider';
import SearchBar from './miniComponents/SearchBar';


function App() {
  const {setMovies}=DataState();
  useEffect(()=>{
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  let getData = async()=>{
    let respon = await axios.get(`${BASE_URL}movies`)
    setMovies(respon.data)
    
  }
  return <>
  <Router>
    <Routes>
   
      <Route path='/' element={<Authtentication/>}/>
      <Route element={<ProtectRoute/>}>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/details/:id' element={<MovieDetails/>}/>
        <Route path='/search' element={<SearchBar/>}/>
        <Route path='/booking' element={<BookingTicket/>}/>
        <Route path='/tickets' element={<MyTickets/>}/>
      </Route>
    </Routes>
  </Router>
  </>
}

export default App;
