import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setBtnLoading(true);
  
  try {
    console.log("Sending request to:", `${server}/api/user/forgot`);
    const { data } = await axios.post(
      `${server}/api/user/forgot`, 
      { email },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Response:", data);
    toast.success(data.message);
    navigate("/login");
  } catch (error) {
    console.error("Full error:", error);
    console.error("Error response:", error.response);
    toast.error(error.response?.data?.message || "Failed to send reset email");
  } finally {
    setBtnLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please Wait..." : "Forgot Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;