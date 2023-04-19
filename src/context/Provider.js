import React, { createContext, useContext, useState } from 'react'
const moviContext = createContext();
const Provider = ({children}) => {
    const [user,setUser]=useState();
    const [selectedMovie,setSelectedmovie]=useState();
    const [tickets,setTickets]=useState([]);
    const [movies,setMovies]=useState([]);
    const [location,setLocation]=useState();
    const [cinemas,setCinemas]=useState();
    const [movieTime,setMovietime]=useState();
    const [seats,setSeats]= useState([])
    const [row,setRow]=useState();
    const [seatNo,setSeatNo]=useState();

   
  return <>
  <moviContext.Provider value={{movieTime,setMovietime,cinemas,setCinemas,user,
    seats,setSeats,setUser,row,setRow,movies,setMovies,seatNo,setSeatNo,location,setLocation,selectedMovie,setSelectedmovie,tickets,setTickets}}>
      {children}
  </moviContext.Provider>
  </>
}
export const DataState=()=>{
    return useContext(moviContext)
}

export default Provider;