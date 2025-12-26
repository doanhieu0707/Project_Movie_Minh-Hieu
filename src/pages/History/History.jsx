import { useEffect, useState } from "react";
import { movieApi } from "../../api/movieApi";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    movieApi
      .post("/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        setHistory(res.data.content.thongTinDatVe);
      })
      .catch(() => {
        alert("Vui lòng đăng nhập");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-8">
          Lịch sử đặt vé
        </h1>

        {history.length === 0 && (
          <p className="text-gray-400">Chưa có lịch sử đặt vé</p>
        )}

        <div className="grid gap-6">
          {history.map((ve, index) => {
            const soVe = ve.danhSachGhe.length;
            const tongTien = ve.giaVe * soVe;

            return (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <p className="font-bold text-lg">{ve.tenPhim}</p>
                  <p className="text-sm text-gray-400">
                    Ngày đặt: {ve.ngayDat.slice(0, 10)}
                  </p>
                </div>

                
                <div>
                  <p>Rạp: {ve.danhSachGhe[0].tenHeThongRap}</p>
                  <p>Cụm: {ve.danhSachGhe[0].tenCumRap}</p>
                  <p>
                    Ghế:{" "}
                    {ve.danhSachGhe.map((g) => g.tenGhe).join(", ")}
                  </p>
                </div>

                
                <div className="text-right">
                  <p className="text-red-500 font-bold text-xl">
                    {tongTien.toLocaleString()} đ
                  </p>
                  <p className="text-sm text-gray-400">
                    ({soVe} vé × {ve.giaVe.toLocaleString()} đ)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
