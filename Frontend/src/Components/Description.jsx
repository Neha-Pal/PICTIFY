
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Description = () => {
  return (
    <div className="flex p-9 justify-between">
      <div className="flex gap-3">
      <h1 className=" text-blue-900 font-bold">Pictify</h1>
      <p>|</p>
      <p>All right reserved.Copyright @pictify</p>
      </div>
      <div className="flex gap-2 text-blue-950 text-2xl">
        <MdFacebook/>
        <FaInstagram/>
        <FaXTwitter/>
      </div>
    </div>
  )
}

export default Description
