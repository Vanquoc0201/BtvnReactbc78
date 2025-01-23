import React from "react";
import { useSelector } from "react-redux";
import Seat from "./seat";
export default function BookingTicket() {
  const props = useSelector((state) => state.bookingTicketReducer);
  const { listSeat, listSeatSelected } = props;
  const renderRowIndex = () => {
    const data = listSeat[0]; // Dòng đầu tiên chứa số thứ tự ghế
    return (
      <div className="flex mb-1">
        {/* Khoảng trống để canh với hàng */}
        <span className="w-12"></span>
        {/* Hiển thị số thứ tự ghế */}
        {data.danhSachGhe.map((item) => (
          <span
            key={item.soGhe}
            className="w-12 h-12 flex items-center justify-center mx-2 font-semibold"
          >
            {item.soGhe}
          </span>
        ))}
      </div>
    );
  };
  const renderListSeat = () => {
    return listSeat.map((row, index) => {
      if (index === 0) return null; // Bỏ hàng đầu tiên vì nó chỉ chứa số thứ tự ghế
      return (
        <div key={row.hang} className="flex mb-2">
          {/* Tên hàng ghế */}
          <span className="w-12 h-12 flex items-center justify-center font-bold mx-1">
            {row.hang}
          </span>
          {/* Danh sách ghế trong hàng */}
          {row.danhSachGhe.map((seat) => (
            <Seat key={seat.soGhe} seat={seat} />
          ))}
        </div>
      );
    });
  };
  const totalPrice = () => {
    return listSeatSelected.reduce((total, seat) => (total += seat.gia), 0);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-10">
        Booking Ticket Online
      </h1>
      <div className="flex">
        <div className="w-4/5 mx-auto">
          <div className="text-center mb-8 ">
            <span className="font-semibold text-lg flex justify-center">
              Màn Hình
            </span>
            <div className="w-100 mx-auto border-t-2 border-gray-300"></div>
          </div>
          {renderRowIndex()}
          {renderListSeat()}
        </div>
        <div className="w-1/5 ml-4">
          <h1 className="font-semibold mb-2">Danh sách ghế đang chọn</h1>
          {listSeatSelected.map((seat) => (
            <div key={seat.soGhe}>
              Ghế: {seat.soGhe} - Giá: {seat.gia}
            </div>
          ))}
          <div>Total: {totalPrice()}</div>
        </div>
      </div>
    </div>
  );
}
