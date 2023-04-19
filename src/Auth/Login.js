import React, { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant";
import { DataState } from "../context/Provider";
const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = DataState();

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("bookingUser"));
    if (customer) {
      setUser(customer);
      navigate("/home");
    } else console.log(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function hidepassword() {
    if (showPass === true) setShowPass(false);
    else setShowPass(true);
  }

  const loginHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      // return;
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          `${BASE_URL}/users/login`,
          { email, password },
          config
        );
        toast({
          title: "Login Successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("bookingUser", JSON.stringify(data));
        const bookingUser = JSON.parse(localStorage.getItem("bookingUser"));
        setUser(bookingUser);
        setLoading(false);
        navigate("/home");
      } catch (error) {
        toast({
          title: "Invalide email password",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="mb-3">
        <label className="form-label">User Email</label>
        <input
          type="email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <label className="form-label">Password</label>
      <div className="input-group mb-3">
        <input
          type={showPass ? "text" : "password"}
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <div className="form-check d-flex flexDirection-row">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => hidepassword()}
          id="flexCheckDefault"
        />{" "}
        &nbsp;&nbsp;
        <label className="form-check-label" for="flexCheckDefault">
          Show Password
        </label>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto mt-4">
        <Button
          isLoading={loading}
          loadingText="Submitting"
          colorScheme="purple"
          onClick={() => loginHandler()}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
