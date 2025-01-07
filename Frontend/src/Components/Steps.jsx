import { FaEye } from "react-icons/fa";
import { FaMagic } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

const Steps = () => {
  return (
    <div className="p-10 my-14 mx-40 bg-blue-200 rounded-xl flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold">How it works?</h1>
      </div>
      <div className="flex items-center my-2 bg-blue-100 rounded-lg px-3 py-2 gap-4">
        <FaEye className="text-4xl text-blue-500" />
        <div>
          <p>Describe your vision..</p>
          <p>Type a phrase, sentence or paragraph that describes the image.</p>
        </div>
      </div>
      <div className="flex items-center my-2 bg-blue-100 rounded-lg px-3 py-2 gap-4">
        <FaMagic className="text-4xl text-blue-500" />
        <div>
          <p>Watch the result!</p>
          <p>Our AI-powered engine will generate your text into a high-quality, unique image in seconds.</p>
        </div>
      </div>
      <div className="flex items-center my-2 bg-blue-100 rounded-lg px-3 py-2 gap-4">
        <MdFileDownload className="text-4xl text-blue-500" />
        <div>
          <p>Download & Share</p>
          <p>Download that image and share it directly.</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
