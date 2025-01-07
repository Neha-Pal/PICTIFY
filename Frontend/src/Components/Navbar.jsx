import { Link, useNavigate } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import { FaStarHalfAlt } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="p-6 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-4">
        <FaImage className="text-blue-400" style={{ fontSize: '40px' }} />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Pictify
        </h2>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/buy')} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-100 hover:bg-blue-200">
              <FaStarHalfAlt className="w-6 h-6 text-blue-400" />
              <p className="text-lg font-medium">Credits left: {credit}</p>
            </button>
            <p className="text-lg font-semibold">Hi, {user.name}</p>
            <div
              className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={logout}
            >
              <IoMdLogOut className="text-blue-500" style={{ fontSize: '30px' }} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate('/buy')}
              className="cursor-pointer hover:underline text-lg font-medium"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-3 sm:px-10 rounded-full hover:bg-zinc-900"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
