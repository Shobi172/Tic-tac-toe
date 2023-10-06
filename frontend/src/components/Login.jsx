import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import instance from "../axios";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const handleLogin = async () => {
    setEmailError("");
    setNameError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    if (!validateName(name)) {
      setNameError("Please enter a valid name, only alphabets");
      return;
    }

    try {
      setLoading(true);
      const response = await instance.post("/api/user/login", { email, name });
      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        const userId = response.data.userId;

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", userId);

        toast.success("Login Successful!");

        navigate("/game");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h1 className="text-3xl font-bold mb-6 text-center text-black-600">
          Login Page
        </h1>
        <div className="w-full">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-center mb-2">{emailError}</p>
          )}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
              nameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {nameError && (
            <p className="text-red-500 text-center mb-2">{nameError}</p>
          )}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 ${
              loading ? "cursor-not-allowed opacity-60" : "hover:bg-blue-600"
            } focus:outline-none focus:ring focus:border-blue-300`}
          >
            {loading ? <HashLoader color={"#ffffff"} size={30} /> : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
