import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credit, setCredit] = useState(0);  // Default credits to 0

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        toast.error("Failed to load credits data.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    if (!token) {
      toast.error("Not Authorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/image/generate-image", { prompt }, { headers: { token } });

      if (response.data.success) {
        return response.data.resultImage; // Return the base64 image string
      } else {
        console.error("Image generation failed:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error in generateImage:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
