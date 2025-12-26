import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieApi } from "../../api/movieApi";

export default function Checkout() {
  const { maLichChieu } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("USER_LOGIN");
    if (!user) navigate("/login");

    movieApi
      .get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      .then((res) => setRoom(res.data.content));
  }, [maLichChieu]);

  const handleSeat = (seat) => {
    if (seat.daDat) return;

    setSelectedSeats((prev) => {
      const exist = prev.find((s) => s.maGhe === seat.maGhe);
      if (exist) return prev.filter((s) => s.maGhe !== seat.maGhe);
      return [...prev, seat];
    });
  };

  const total = selectedSeats.reduce((sum, s) => sum + s.giaVe, 0);

  const handleBooking = () => {
    const payload = {
      maLichChieu,
      danhSachVe: selectedSeats.map((s) => ({
        maGhe: s.maGhe,
        giaVe: s.giaVe,
      })),
    };

    movieApi.post("/QuanLyDatVe/DatVe", payload).then(() => {
      alert("Đặt vé thành công!");
      navigate("/");
    });
  };

  if (!room) return null;

  return (
    <div className="min-h-screen bg-slate-900 p-10 text-white">
      <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="col-span-8">
          <h2 className="text-center mb-4">MÀN HÌNH</h2>
          <div className="grid grid-cols-16 gap-2 justify-center">
            {room.danhSachGhe.map((seat) => {
              let cls = "seat seat-normal";
              if (seat.daDat) cls = "seat seat-booked";
              else if (seat.loaiGhe === "Vip") cls = "seat seat-vip";
              if (selectedSeats.find((s) => s.maGhe === seat.maGhe))
                cls = "seat seat-selected";

              return (
                <button
                  key={seat.maGhe}
                  className={cls}
                  onClick={() => handleSeat(seat)}
                >
                  {seat.tenGhe}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-4 bg-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl text-red-500">
            {room.thongTinPhim.tenPhim}
          </h2>
          <p>{room.thongTinPhim.tenCumRap}</p>
          <p>
            {room.thongTinPhim.ngayChieu} {" "}
            {room.thongTinPhim.gioChieu}
          </p>

          <div>
            Ghế:
            {selectedSeats.map((s) => (
              <span key={s.maGhe} className="text-green-400 ml-1">
                {s.tenGhe}
              </span>
            ))}
          </div>

          <p className="text-xl">
            Tổng:{" "}
            <span className="text-red-500">
              {total.toLocaleString()} đ
            </span>
          </p>

          <button className="btn-primary w-full" onClick={handleBooking}>
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
}
