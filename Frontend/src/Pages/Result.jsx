import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion
import g2 from "../assets/g2.jpg"; // Placeholder default image
import { AppContext } from "../Context/AppContext";

const Result = () => {
  const [image, setImage] = useState(g2); // Initialize with default image
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  // Clean up Blob URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (isImageLoaded) {
        URL.revokeObjectURL(image); // Revoke the Blob URL when component unmounts
      }
    };
  }, [isImageLoaded, image]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      try {
        const generatedImage = await generateImage(input); // Call the context function
        if (generatedImage) {
          const response = await fetch(generatedImage);
          const blob = await response.blob(); // Convert the URL or base64 to Blob
          const blobUrl = URL.createObjectURL(blob); // Create a Blob URL
          setImage(blobUrl); // Update the image state with the Blob URL
          setImageLoaded(true);
        }
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }

    setLoading(false);
  };

  const downloadImage = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = image; // Use the Blob URL
    link.download = "generated_image.jpg"; // Specify the file name
    document.body.appendChild(link); // Append link to the body
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link after downloading
  };


  return (
    <div
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center p-14 bg-gradient-to-b from-blue-100 to-blue-200"
    >
      <form className="flex flex-col items-center">
        <div className="flex justify-center items-center mb-4">
          {/* Image wrapper with relative positioning */}
          <div className="relative w-fit">
            <motion.img
              src={image}
              alt="generated_image"
              className="w-96 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Loading line */}
            <motion.span
              className={`absolute bottom-0 left-0 h-1 bg-blue-400 ${
                Loading ? "w-full transition-all duration-[10s]" : "w-0"
              }`}
              initial={{ width: "0%" }}
              animate={{ width: Loading ? "100%" : "0%" }}
              transition={{ duration: 5 }}
            />
          </div>
        </div>
        <motion.p
          className={`text-center mb-6 text-gray-700 ${!Loading ? "hidden" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Loading...
        </motion.p>

        {!isImageLoaded && (
          <motion.div
            className="flex items-center justify-center w-full max-w-xl bg-neutral-300 text-sm p-0.5 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Write your prompt.."
              className="flex-1 bg-transparent outline-none pl-6 text-lg"
            />
            <motion.button
              className="px-8 sm:px-12 py-2 font-bold text-lg bg-black text-white rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate
            </motion.button>
          </motion.div>
        )}

        {isImageLoaded && (
          <div className="flex gap-3 mt-6">
            <motion.button
              onClick={() => {
                setImageLoaded(false);
                setLoading(true); // Reset loading state when generating another image
                setImage(g2); // Reset the image to the default before generating another
              }}
              className="px-6 py-2 font-bold text-lg bg-white text-black rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Another
            </motion.button>
              <motion.button
              onClick={downloadImage}
                className="px-6 py-2 font-bold text-lg bg-black text-white rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Download
              </motion.button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Result;
