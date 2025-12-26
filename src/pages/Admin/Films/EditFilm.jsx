import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieApi } from "../../../api/movieApi";

export default function EditFilm() {
  const { idFilm } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    maPhim: "",
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 10,
    hinhAnh: null,
  });

  /* ================== UTIL FORMAT DATE ================== */
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /* ================== LOAD CHI TIẾT PHIM ================== */
  useEffect(() => {
    movieApi
      .get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`)
      .then((res) => {
        const film = res.data.content;

        setForm({
          maPhim: film.maPhim,
          tenPhim: film.tenPhim,
          trailer: film.trailer,
          moTa: film.moTa,
          ngayKhoiChieu: film.ngayKhoiChieu.split("T")[0],
          sapChieu: film.sapChieu,
          dangChieu: film.dangChieu,
          hot: film.hot,
          danhGia: film.danhGia,
          hinhAnh: null,
        });

        setPreview(film.hinhAnh);
      });
  }, [idFilm]);

  /* ================== HANDLE CHANGE ================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, hinhAnh: file });
    setPreview(URL.createObjectURL(file));
  };

  /* ================== SUBMIT ================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("maPhim", form.maPhim);
    formData.append("tenPhim", form.tenPhim);
    formData.append("trailer", form.trailer);
    formData.append("moTa", form.moTa);
    formData.append("maNhom", "GP01");

    // ✅ FIX LỖI NGÀY
    formData.append(
      "ngayKhoiChieu",
      formatDate(form.ngayKhoiChieu)
    );

    formData.append("sapChieu", form.sapChieu);
    formData.append("dangChieu", form.dangChieu);
    formData.append("hot", form.hot);
    formData.append("danhGia", form.danhGia);

    if (form.hinhAnh) {
      formData.append("File", form.hinhAnh);
    }

    await movieApi.post(
      "/QuanLyPhim/CapNhatPhimUpload",
      formData
    );

    alert("Cập nhật phim thành công");
    navigate("/admin/films");
  };

  /* ================== UI ================== */
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Cập nhật phim
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label>Tên phim</label>
            <input
              name="tenPhim"
              value={form.tenPhim}
              onChange={handleChange}
              className="w-full input"
            />
          </div>

          <div>
            <label>Trailer</label>
            <input
              name="trailer"
              value={form.trailer}
              onChange={handleChange}
              className="w-full input"
            />
          </div>

          <div>
            <label>Mô tả</label>
            <textarea
              name="moTa"
              value={form.moTa}
              onChange={handleChange}
              className="w-full input h-24"
            />
          </div>

          <div>
            <label>Ngày khởi chiếu</label>
            <input
              type="date"
              name="ngayKhoiChieu"
              value={form.ngayKhoiChieu}
              onChange={handleChange}
              className="w-full input"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="dangChieu"
                checked={form.dangChieu}
                onChange={handleChange}
              />
              Đang chiếu
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sapChieu"
                checked={form.sapChieu}
                onChange={handleChange}
              />
              Sắp chiếu
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hot"
                checked={form.hot}
                onChange={handleChange}
              />
              Hot
            </label>
          </div>

          <div>
            <label>Đánh giá</label>
            <input
              type="number"
              name="danhGia"
              value={form.danhGia}
              onChange={handleChange}
              className="w-full input"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label>Hình ảnh</label>
            <input type="file" onChange={handleFile} />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 rounded shadow"
            />
          )}

          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
