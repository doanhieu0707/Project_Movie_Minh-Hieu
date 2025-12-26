import { useEffect, useState } from "react";
import { movieApi } from "../../api/movieApi";

export default function SeatModal({ phim, lichChieu, onClose }) {
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [chonGhe, setChonGhe] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    movieApi
      .get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${lichChieu.maLichChieu}`)
      .then(res => setDanhSachGhe(res.data.content.danhSachGhe));
  }, [lichChieu]);

  const toggleGhe = ghe => {
    if (ghe.daDat) return;

    setChonGhe(prev =>
      prev.find(g => g.maGhe === ghe.maGhe)
        ? prev.filter(g => g.maGhe !== ghe.maGhe)
        : [...prev, ghe]
    );
  };

  const tongTien = chonGhe.reduce((sum, g) => sum + g.giaVe, 0);

  const datVe = async () => {
    const user = JSON.parse(localStorage.getItem("USER_LOGIN"));
    if (!user) {
      alert("Vui lòng đăng nhập để đặt vé");
      return;
    }

    setLoading(true);

    try {
      await movieApi.post("/QuanLyDatVe/DatVe", {
        maLichChieu: lichChieu.maLichChieu,
        danhSachVe: chonGhe.map(g => ({
          maGhe: g.maGhe,
          giaVe: g.giaVe,
        })),
      });

      alert("Đặt vé thành công");
      onClose();
    } catch {
      alert("Đặt vé thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-4xl p-6 rounded-xl relative">

        <button onClick={onClose} className="absolute top-4 right-4">✖</button>

        <div className="flex gap-4 mb-5">
          <img src={phim.hinhAnh} className="w-24 rounded" />
          <div>
            <h3 className="text-xl font-bold">{phim.tenPhim}</h3>
            <p className="text-gray-600">
              {lichChieu.ngayChieuGioChieu}
            </p>
            <p className="text-red-500 font-semibold">
              {lichChieu.tenCumRap}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 text-white text-center py-2 rounded mb-5">
          MÀN HÌNH
        </div>

        <div className="grid grid-cols-16 gap-2 justify-center mb-6">
          {danhSachGhe.map(ghe => {
            let style = "bg-gray-300";
            if (ghe.daDat) style = "bg-gray-500 cursor-not-allowed";
            if (chonGhe.find(g => g.maGhe === ghe.maGhe))
              style = "bg-green-500";

            return (
              <button
                key={ghe.maGhe}
                onClick={() => toggleGhe(ghe)}
                className={`w-8 h-8 text-xs rounded ${style}`}
              >
                {ghe.tenGhe}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p>Ghế: {chonGhe.map(g => g.tenGhe).join(", ")}</p>
            <p className="text-red-500 font-bold">
              Tổng tiền: {tongTien.toLocaleString()} đ
            </p>
          </div>

          <button
            onClick={datVe}
            disabled={!chonGhe.length || loading}
            className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Đang đặt vé..." : "Xác nhận đặt vé"}
          </button>
        </div>
      </div>
    </div>
  );
}
