import React, { useState, useEffect } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
const Authtentication = () => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <>
      <div className="log-main">
        <div className="title">
          Book<span> M</span>y<span> T</span>ickets
        </div>
        <div className="auth-page ">
          <div className="auth-btn">
            <button
              className={!toggle ? "btn btn-color" : "btn"}
              onClick={() => setToggle(false)}
            >
              Login
            </button>
            <button
              className={toggle ? "btn btn-color" : "btn"}
              onClick={() => setToggle(true)}
            >
              Register
            </button>
          </div>
          <div className="auth-main">{toggle ? <Register /> : <Login />}</div>
        </div>
      </div>
    </>
  );
};

export default Authtentication;
