import React, { useContext } from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Top Section */}
      <div className="flex items-center gap-3 px-4 py-4 rounded-lg bg-blue-200 hover:bg-blue-300">
        <p>Text to Image Generator</p>
        <FaStarHalfAlt className="w-4 text-yellow-500" />
      </div>

      {/* Main Section */}
      <div className="text-center py-8">
        <motion.div
          className="text-5xl font-bold py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 2 }}
        >
          Turn your text to
        </motion.div>
        <span className="text-6xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Image
        </span>
      </div>
      <motion.div
        className="text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Transform your imagination into stunning imagery in seconds
      </motion.div>

      {/* Generate Button */}
      <div className="py-5">
        <motion.button
          onClick={onClickHandler}
          className="flex items-center justify-center gap-5 rounded-3xl px-10 py-4 bg-black hover:bg-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8 }, duration: 1 }}
        >
          <p className="text-3xl font-bold text-white">Generate</p>
          <BsStars className="text-4xl text-yellow-200" />
        </motion.button>
      </div>

      {/* Image Gallery */}
      <motion.div
        className="flex items-center justify-center gap-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <img src={g1} alt="Gallery 1" className="w-20 h-20 rounded-lg object-cover" />
        <img src={g2} alt="Gallery 2" className="w-20 h-20 rounded-lg object-cover" />
        <img src={g3} alt="Gallery 3" className="w-20 h-20 rounded-lg object-cover" />
        <img src={g4} alt="Gallery 4" className="w-20 h-20 rounded-lg object-cover" />
        <img src={g5} alt="Gallery 5" className="w-20 h-20 rounded-lg object-cover" />
      </motion.div>
      <p>Generated images from Pictify</p>
    </motion.div>
  );
};

export default Header;
