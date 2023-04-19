import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataState } from "../context/Provider";
import Footer from "../miniComponents/Footer";

const MovieDetails = () => {
  const { movies, setSelectedmovie } = DataState();
  let [data, setData] = useState();
  let params = useParams();

  useEffect(() => {
    if (params.id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getData() {
    let d = movies?.filter((e) => e._id === params.id);
    setSelectedmovie(d[0]);
    setData(d[0]);
  }
  return (
    <>
      {data === undefined ? (
        <div className="loading"></div>
      ) : (
        <div>
          <div className="d-back">
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
          <div className="main-poster">
            <div className="poster-content">
              <div className="poster">
                <div className="card mb-3 bg-dark">
                  <img
                    src={data.poster}
                    className="card-img-top"
                    alt="...poster"
                  />
                  <div className="card-body p-0 text-center">
                    <p className="card-text bg-dark text-white">In cinemas</p>
                  </div>
                </div>
              </div>

              <div className="movie-details">
                <div className="des-title">
                  <b>{data.movieName}</b>&nbsp;&nbsp;&nbsp;{data.type}
                </div>
                <span className="heart">
                  <i className="fa-solid fa-heart"></i>&nbsp;{data.like}%
                </span>
                <div className="d">2D</div>
                <div className="language">{data.language}</div>
                <div className="duration">
                  {data.duration}&nbsp;.&nbsp;{data.categori}
                </div>
                <h2>{data.releaseDate}</h2>
                <div className="d-btn">
                  <a href={data.trailer} target="_blank" rel="noreferrer">
                    <Button
                      bg="#1cb61c"
                      _hover={{
                        background: "#50ce50",
                        color: "white",
                      }}
                    >
                      <i className="fa-solid fa-circle-play"></i> &nbsp; Trailer
                    </Button>
                  </a>
                  <Link to="/booking">
                    <Button
                      bg="#ff1414"
                      _hover={{
                        background: "#e62a2a",
                        color: "white",
                      }}
                    >
                      <i className="fa-solid fa-ticket"></i> &nbsp; Booking
                      Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="about-movie">
            <div className="a-about">
              <h1>About the movie</h1>
              <p>{data.about}</p>
              <br></br>
              <hr></hr>
            </div>
            <div className="cast">
              <p>Cast</p>
              {data.cast.map((e, i) => {
                return (
                  <div key={i} className="cast-detail">
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt="cast"
                    />
                    <p>{e}</p>

                    <span>Actor</span>
                  </div>
                );
              })}
              <br></br>
              <hr></hr>
            </div>
            <div className="cast">
              <p>Crew</p>
              {data.crew.map((e, i) => {
                return (
                  <div key={i} className="cast-detail">
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt="cast"
                    />
                    <p>{e}</p>
                  </div>
                );
              })}
              <br></br>
              <hr></hr>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MovieDetails;
