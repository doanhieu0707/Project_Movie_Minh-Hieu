import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieApi } from "../../../api/movieApi";

export default function Showtime() {
  const { maPhim } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);

  const [form, setForm] = useState({
    maHeThongRap: "",
    maCumRap: "",
    ngayChieu: "",
    giaVe: "",
  });

  const [time, setTime] = useState({
    hour: "9",
    minute: "00",
    period: "AM",
  });

  useEffect(() => {
    movieApi
      .get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => setFilm(res.data.content))
      .catch(() => alert("Không tìm thấy phim"));
  }, [maPhim]);

  useEffect(() => {
    movieApi
      .get("/QuanLyRap/LayThongTinHeThongRap")
      .then((res) => setHeThongRap(res.data.content));
  }, []);


  const handleHeThongRap = async (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      maHeThongRap: value,
      maCumRap: "",
    });
    setCumRap([]);

    if (!value) return;

    const res = await movieApi.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`
    );
    setCumRap(res.data.content);

    // Cinestar
    if (value === "CineStar") {
      setTime({ hour: "0", minute: "00", period: "AM" });
    }
  };

  // Convert time
  const convertTime = () => {
    let h = Number(time.hour);

    if (time.period === "PM" && h !== 12) h += 12;
    if (time.period === "AM" && h === 12) h = 0;

    if (form.maHeThongRap === "CineStar" && h < 0) {
      h = 0;
    }

    return `${h.toString().padStart(2, "0")}:${time.minute}:00`;
  };

  const formatDateTime = () => {
    const [y, m, d] = form.ngayChieu.split("-");
    return `${d}/${m}/${y} ${convertTime()}`;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.maCumRap || !form.ngayChieu || !form.giaVe) {
      alert("Nhập đầy đủ thông tin");
      return;
    }

    const payload = {
      maPhim: Number(maPhim),
      maRap: form.maCumRap, 
      ngayChieuGioChieu: formatDateTime(),
      giaVe: Number(form.giaVe),
    };

    console.log("POST DATA:", payload);

    try {
      await movieApi.post("/QuanLyDatVe/TaoLichChieu", payload);
      alert("Tạo lịch chiếu thành công");
      navigate("/admin/films");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.content || "Tạo lịch chiếu thất bại");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl">
      {film && (
        <div className="flex gap-4 mb-6">
          <img
            src={film.hinhAnh}
            alt={film.tenPhim}
            className="w-28 rounded shadow"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/150x220?text=No+Image")
            }
          />
          <div>
            <h2 className="text-xl font-semibold">{film.tenPhim}</h2>
            <p className="text-gray-500 text-sm line-clamp-2">{film.moTa}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="border p-2 w-full rounded"
          value={form.maHeThongRap}
          onChange={handleHeThongRap}
        >
          <option value="">Chọn hệ thống rạp</option>
          {heThongRap.map((h) => (
            <option key={h.maHeThongRap} value={h.maHeThongRap}>
              {h.tenHeThongRap}
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full rounded"
          value={form.maCumRap}
          onChange={(e) =>
            setForm({ ...form, maCumRap: e.target.value })
          }
          disabled={!cumRap.length}
        >
          <option value="">Chọn cụm rạp</option>
          {cumRap.map((c) => (
            <option key={c.maCumRap} value={c.maCumRap}>
              {c.tenCumRap}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full rounded"
          value={form.ngayChieu}
          onChange={(e) =>
            setForm({ ...form, ngayChieu: e.target.value })
          }
        />

        <div className="grid grid-cols-3 gap-3">
          <select
            className="border p-2 rounded"
            value={time.hour}
            onChange={(e) =>
              setTime({ ...time, hour: e.target.value })
            }
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={time.minute}
            onChange={(e) =>
              setTime({ ...time, minute: e.target.value })
            }
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={time.period}
            onChange={(e) =>
              setTime({ ...time, period: e.target.value })
            }
          >
            <option value="AM">Sáng</option>
            <option value="PM">Tối</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Giá vé"
          className="border p-2 w-full rounded"
          value={form.giaVe}
          onChange={(e) =>
            setForm({ ...form, giaVe: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Tạo lịch chiếu
        </button>
      </form>
    </div>
  );
}
