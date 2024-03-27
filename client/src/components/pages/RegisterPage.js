import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../Layout";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      navigate("/profile");
    }
  }, []);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
    } else {
      try {
        const body = { email, password };
        const response = await fetch(
          "http://localhost:4000/authentication/register",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const parseRes = await response.json();

        if (parseRes.jwtToken) {
          localStorage.setItem("token", parseRes.jwtToken);
          navigate("/profile");
        } else {
          toast.error(parseRes);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Layout>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => onChange(e)}
          className="my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onChange(e)}
          className="my-3"
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => onChange(e)}
          className="my-3"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <Link to="/login">login</Link>
      <ToastContainer />
    </Layout>
  );
};

export default Register;
