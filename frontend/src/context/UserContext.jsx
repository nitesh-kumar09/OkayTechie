import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // LOGIN
async function loginUser(email, password, navigate, fetchMyCourse) {
  setBtnLoading(true);

  // Ensure email and password are provided
  if (!email || !password) {
    toast.error("Email and password are required");
    setBtnLoading(false);
    return;
  }

  try {
    const { data } = await axios.post(`${server}/api/user/login`, {
      email,
      password,
    });

    // Handle successful login
    toast.success(data.message);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsAuth(true);
    setBtnLoading(false);
    navigate("/");
    fetchMyCourse();
  } catch (error) {
    setBtnLoading(false);
    setIsAuth(false);

    // Check if it's a 400 error
    if (error?.response?.status === 400) {
      // Prevent the error from appearing in the console by handling it silently
      const message = error?.response?.data?.message || "Invalid email or password.";
      toast.error(message);
    } else {
      // Handle any unexpected errors without showing them in the console
      const errorMessage = error?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  }
}





  // REGISTER
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);

    if (!name || !email || !password) {
      toast.error("All fields are required");
      setBtnLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  }

  // VERIFY OTP
  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");

    if (!otp) {
      toast.error("OTP is required");
      setBtnLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
      setBtnLoading(false);
    }
  }

  // FETCH USER
  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      // console.error("User fetch error:", error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
