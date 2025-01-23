import { setSeatSelected } from "./slice";
import "./style.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function Seat({ seat }) {
    const [isChoosing, setIsChoosing] = useState(false);
    const dispatch = useDispatch();
  return <button
    disabled={seat.daDat}
    onClick={()=>{
        setIsChoosing(!isChoosing);
        dispatch(setSeatSelected(seat))
    }}
    className={`seat ${seat.daDat ? "seatSold" : ""} ${isChoosing ? "seatChoosing" : ""}`}
    style={{ width: '48px', height: '48px', margin: '8px' }}  // Kích thước cố định cho ghế
    >
    {seat.soGhe}
    </button>;
}
