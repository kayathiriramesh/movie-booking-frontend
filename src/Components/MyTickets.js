import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../constant'
import { DataState } from '../context/Provider';
import qrcode from '../New folder/qrcode.gif';
import caution from '../New folder/caution.gif'


const MyTickets = () => {

  useEffect(()=>{
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const {user,tickets,setTickets}=DataState()

  const getData = async()=>{
    try {
      let respon = await axios.get(`${BASE_URL}tickets`)
      let data = await respon.data;
      let sort = data.filter((e)=>e.email===user.email)
      setTickets(sort)
    } catch (error) {
      
    }
  }
  console.log(tickets);
  return <>
  <div className='MyTickets'>
      <div className='tickets-head'>
      <h1>Your Tickets</h1>
      <Link to="/home">
        <button className='btn btn-primary'>Back to Home</button>
      </Link>
      </div>
      <div className='main-tickets'>
      {
        tickets.length?tickets.map((e)=>{
          return <div className='ticket' key={e._id}>
              <div className='ticket-h'>
                <img src={e.pic}  alt={e.name}/>
                <div className='t-detail'>
                  <h1>{e.movieName}</h1>
                  <p>Tamli, 2D</p>
                  <p>{e.time}</p>
                  <p>{e.date}</p>
                  <h1>{e.cinema} : {e.place}</h1>
                </div>
              </div>
              <div className='ticket-b'>
                <div className='b-1'>
                  <h1>{e.seat.length}</h1>
                  <p>Tickets</p>
                </div>
                <div className='b-2'>
                <p className='badge bg-primary mt-2'>Screen 1</p>
                <h1>FIRST CL - {e.seat.map(s=><>{e.srow}{s},</>)}</h1>
                </div>
              </div>
              <div className='qr-code'>
                <img src={qrcode} alt="qrcode"/>
                <p>Booking Id :<span>WRTNX3UD</span></p>
              </div>
              <div className='ticket-f'>
                <img src={caution} alt="caution"/>
                <p> This booking can be cancel and refund
                  75% cash as per cinema cancellation policy.
                </p>
              </div>
              
          </div>
          
        }):<div style={{height:"100vh",textAlign:"center",fontSize:"30px"}}>Tickects Not Available</div>
      }
      </div>
  </div>
  {/* <Footer/> */}
  </>
}
export default MyTickets;