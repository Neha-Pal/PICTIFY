import { useContext } from "react";
import { plans } from "../assets/assets";
import { FaLock } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import { motion } from "framer-motion";

const BuyCredit = () => {
  const { user } = useContext(AppContext);

  // Framer Motion variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      className="text-center pt-14 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Button */}
      <motion.button
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 text-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Our Plans
      </motion.button>

      <h1 className="text-2xl font-bold mt-4">Choose the Plan</h1>

      {/* Animated Plan Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
        initial="hidden"
        animate="visible"
      >
        {plans.map((item, index) => (
          <motion.div
            key={index}
            className="border rounded-lg shadow-lg p-6 bg-white flex flex-col items-center"
            custom={index}
            variants={cardVariants}
          >
            <FaLock className="text-blue-500 text-3xl mb-4" />
            <p className="text-lg font-semibold mb-2">Plan ID: {item.id}</p>
            <p className="text-gray-600 mb-4">{item.desc}</p>
            <p className="text-lg font-bold">
              <span className="text-3xl">${item.price}</span> / {item.credits} credits
            </p>
            <motion.button
              className="bg-black text-white font-bold px-6 py-3 mt-3 mb-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? "Purchase" : "Get Started"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BuyCredit;
