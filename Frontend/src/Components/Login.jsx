import { useEffect, useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoKeySharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        backendUrl + (state === "Login" ? "/api/user/login" : "/api/user/signup");

      const payload =
        state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(`${state} successful!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
      >
        {/* Close Icon */}
        <ImCross
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer"
        />

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          {state}
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome! {state === "Login" ? "Please log in to continue" : "Please sign up to continue"}
        </p>

        {/* Full Name Input */}
        {state === "Sign Up" && (
          <div className="flex items-center bg-gray-100 rounded-md p-2 mb-4">
            <FaUser className="text-gray-500 mr-2" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm bg-transparent flex-1"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        {/* Email Input */}
        <div className="flex items-center bg-gray-100 rounded-md p-2 mb-4">
          <MdEmail className="text-gray-500 mr-2" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm bg-transparent flex-1"
            placeholder="Email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center bg-gray-100 rounded-md p-2 mb-4">
          <IoKeySharp className="text-gray-500 mr-2" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm bg-transparent flex-1"
            placeholder="Password"
            required
          />
        </div>

        {/* Forgot Password (Visible Only in Login) */}
        {state === "Login" && (
          <p className="text-right text-sm text-blue-500 hover:underline cursor-pointer mb-6">
            Forgot Password?
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {/* Toggle Between Login and Sign Up */}
        {state === "Login" ? (
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Log In
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
