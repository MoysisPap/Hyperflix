import { FaInfoCircle } from "react-icons/fa";
const BtnDetails = ({onClick}) => {
  return(
    <button className="btn flex justify-center items-center gap-1" onClick={onClick}><FaInfoCircle /> More Details</button>
  )
}
export default BtnDetails;
