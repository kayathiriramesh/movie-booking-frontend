import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../constant'
import { DataState } from '../context/Provider'
import StripeCheckout from 'react-stripe-checkout';
import "./bookticket.css";
import { useNavigate } from "react-router-dom";


const BookingTicket = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [total, setTotal] = useState();
  const [convenFee, SetconvenFee] = useState();
  const [subtotal, Setsubtotal] = useState();
  const [tdate, setDate] = useState();
  const [pop, setPop] = useState(false)
  const { user, selectedMovie, cinemas, setCinemas, location, seats, setSeats, row, setRow, setMovietime, movieTime } = DataState();

  console.log(user);

  const seatsfun = (newseat) => {
    if (newseat) {
      if (seats.includes(newseat)) {
        toast({
          title: `Seat No: ${newseat} was already Selected`,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        seats.push(newseat)
        setSeats([...seats])
        setTotal(seats.length * 220)
        SetconvenFee(seats.length * 30)
        Setsubtotal(seats.length * 220 + seats.length * 30)
      }
    }
  }

  const handleToken = async (token) => {
    console.log(user);
    let email = user.email;
    let movieName = selectedMovie.movieName;
    let pic = selectedMovie.poster;
    let date = tdate;
    let time = movieTime;
    let cinema = cinemas;
    let place = location;
    let seat = seats;
    let srow = row;

    if (!date && !time) {
      toast({
        title: "Select data and Movie time",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } else if (!cinema) {
      toast({
        title: "Select Cinema to Book Tickets",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } else if (!srow) {
      toast({
        title: "Ticket booked successfully",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      navigate(`/home`);
    } else if (seats <= 0) {
      toast({
        title: "Select seats",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } else {
      try {
        const response = await axios.post(`${BASE_URL}create-checkout-session`, {
          email,
          movieName,
          pic,
          date,
          time,
          cinema,
          place,
          seat,
          srow,
          amount: subtotal * 100, // Amount is in cents
        });

        const sessionId = response.data.sessionId;
        const stripe = window.Stripe('sk_test_51MrgPdSAtP0Jtr0doRyN7prpseVCaqd8dm3Vga1txaosZFGNhdqcr70ISKRGPU5ipGIINvqMUqoOBKorZdCfsNt700MR4nZmVw');
        stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        console.log(error);
        navigate(`/home`);
        console.log(error);
      }
    }
  }


  return (
    <>
      <div className="booking-page">
        <div className="back">
          <Link to="/home">
            <Button
              bg="#1cb61c"
              color="white"
              _hover={{
                background: "#50ce50",
                color: "white",
              }}
            >
              back
            </Button>
          </Link>
        </div>
        <div className="booking-head">
          <div className="movie-booking-del">
            <div className="part-1">
              <h1>{selectedMovie.movieName}</h1> &nbsp; {selectedMovie.type}
            </div>
            <div>
              <span className="heart">
                <i class="fa-solid fa-heart"></i>&nbsp;85%
              </span>
              <div className="duration">
                <i class="fa-solid fa-clock-rotate-left"></i>&nbsp;
                {selectedMovie.duration}&nbsp;.&nbsp;{selectedMovie.categori}
              </div>
            </div>
          </div>
          <div className="getbooking-data">
            <label>Cinemas :</label>&nbsp;
            <select onChange={(e) => setCinemas(e.target.value)}>
              <option>Select Cinema</option>
              <option>INOX</option>
              <option>PVR</option>
              <option>Cinepolis</option>
              <option>AGS</option>
              <option>Luxe</option>
            </select>{" "}
            &nbsp;
            <label>Date :</label>&nbsp;
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="pl-4"
            />
            &nbsp;
            <label>Movie time :</label>&nbsp;
            <select onChange={(e) => setMovietime(e.target.value)}>
              <option>Select Movie Time</option>
              <option>9:00 AM</option>
              <option>12:30 PM</option>
              <option>4:00 PM</option>
              <option>7:00 PM</option>
              <option>10:00 PM</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="book-sum">
              <div>
                <span>Movie:</span>
                <span>{selectedMovie.movieName}</span>
              </div>
              <div>
                <span>Cinema:</span>
                <span>{cinemas}</span>
              </div>
              <div>
                <span>Date:</span>
                <span>{tdate}</span>
              </div>
              {/* <div>
              <span>Time:</span>
              <span>{movietime}</span>
            </div> */}
              <div>
                <span>Seats:</span>
                <span>{seats.join(", ")}</span>
              </div>
              <div>
                <span>Total:</span>
                <span>Rs.{seats.length * 100}</span>
              </div>
            </div>
            <div className="book-continue">
              <StripeCheckout
                stripeKey="pk_test_51MrgPdSAtP0Jtr0dobX82wXsfh6ie00D31u3dgBmBO94vPLdeXdOorP7PJ1NQblqWxYTrKnaFIma0QQcooM8PpQz00BU0H9ec9"
                token={handleToken}
                amount={seats.length * 10000}
                currency="INR"
                name={selectedMovie.movieName}
                email="your_email_address"
                billingAddress
                shippingAddress
                zipCode
                image="https://your_image_url"
                description={`Movie: ${selectedMovie.movieName} - Seats: ${seats.join(", ")}`}
                locale="auto"
                allowRememberMe
              >
                <Button
                  bg="#1cb61c"
                  color="white"
                  _hover={{
                    background: "#50ce50",
                    color: "white",
                  }}
                >
                  Continue to Payment
                </Button>
              </StripeCheckout>
            </div>
          </div>
          <div style={{ marginRight: "50px" }}>
            <div className="booking-info">
              <ul>
                <li>
                  <div className="seat"></div>
                  <small>Available</small>
                </li>
                <li>
                  <div className="seat selected"></div>
                  <small>Selected</small>
                </li>
                <li>
                  <div className="seat occupied"></div>
                  <small>Occupied</small>
                </li>
              </ul>
              <div className="screen">
                <div className="seats">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((r) => (
                    <div className="row">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((c) => {
                        let seat = r + String.fromCharCode(96 + c);
                        let selected = seats.includes(seat);
                        let occupied = false;
                        return (
                          <div
                            className={`seat ${selected ? "selected" : ""}${occupied ? "occupied" : ""
                              }`}
                            onClick={() => seatsfun(seat)}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="seat-details">
                <div>
                  <div className="seat selected"></div>
                  <span>Selected</span>
                </div>

                <div>
                  <div className="seat occupied"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
export default BookingTicket;
