import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../../api/movieApi";
import SeatModal from "../../components/SeatModal/SeatModal";

export default function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [lichChieu, setLichChieu] = useState(null);

  useEffect(() => {
    movieApi
      .get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then(res => setDetail(res.data.content));
  }, [id]);

  if (!detail) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-10">
        <img src={detail.hinhAnh} className="w-full h-full sm:w-64 rounded-lg object-cover" />
        <div>
          <h1 className="text-xl sm:text-3xl text-white font-bold">{detail.tenPhim}</h1>
          <p className="text-gray-400 sm:text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">
            {detail.moTa}
          </p>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl text-pink-300 font-bold mb-3 sm:mb-4">
        Chọn giờ chiếu
      </h2>

      {detail.heThongRapChieu.map(ht => (
        <div key={ht.maHeThongRap} className="text-blue-300 mb-4 sm:mb-6">
          <h3 className="text-red-500 font-semibold mb-2 mt-6 sm:mt-9 text-base sm:text-lg">
            {ht.tenHeThongRap}
          </h3>

          {ht.cumRapChieu.map(cum => (
            <div key={cum.maCumRap} className="mb-3 sm:mb-4">
              <p className="font-medium text-sm sm:text-base">{cum.tenCumRap}</p>

              <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                {cum.lichChieuPhim.map(lich => (
                  <button
                    key={lich.maLichChieu}
                    onClick={() => setLichChieu(lich)}
                    className="border border-red-500 text-red-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded hover:bg-red-500 hover:text-white"
                  >
                    {lich.ngayChieuGioChieu.slice(11, 16)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {lichChieu && (
        <SeatModal
          phim={detail}
          lichChieu={lichChieu}
          onClose={() => setLichChieu(null)}
        />
      )}
    </div>
  );
}
