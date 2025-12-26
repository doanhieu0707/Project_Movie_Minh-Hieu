import { useState } from "react";
import { movieApi } from "../../../api/movieApi";
import { useNavigate } from "react-router-dom";


const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function AddFilm() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("USER_LOGIN"));

  // Check quyền admin
  if (!user || user.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập");
    navigate("/");
    return null;
  }

  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: true,
    dangChieu: true,
    hot: false,
    danhGia: 10,
    hinhAnh: null,
  });

  // input text, checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // image
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, hinhAnh: file });
    setPreview(URL.createObjectURL(file));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tenPhim || !form.ngayKhoiChieu) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    if (!form.hinhAnh) {
      alert("Vui lòng chọn hình ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("tenPhim", form.tenPhim);
    formData.append("trailer", form.trailer);
    formData.append("moTa", form.moTa);
    formData.append("maNhom", "GP01");
    formData.append(
      "ngayKhoiChieu",
      formatDate(form.ngayKhoiChieu)
    );
    formData.append("sapChieu", String(form.sapChieu));
    formData.append("dangChieu", String(form.dangChieu));
    formData.append("hot", String(form.hot));
    formData.append("danhGia", form.danhGia);
    formData.append("File", form.hinhAnh);

    try {
      await movieApi.post(
        "/QuanLyPhim/ThemPhimUploadHinh",
        formData
      );
      alert("Thêm phim thành công");
      navigate("/admin/films");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.content ||
          "Thêm phim thất bại"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-6">
        Thêm mới phim
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Tên phim
            </label>
            <input
              name="tenPhim"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Trailer
            </label>
            <input
              name="trailer"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Mô tả
            </label>
            <textarea
              name="moTa"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-24"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Ngày khởi chiếu
            </label>
            <input
              type="date"
              name="ngayKhoiChieu"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
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
            <label className="block text-sm mb-1">
              Đánh giá
            </label>
            <input
              type="number"
              name="danhGia"
              value={form.danhGia}
              onChange={handleChange}
              min={1}
              max={10}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Hình ảnh
            </label>
            <input type="file" onChange={handleFile} />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-48 rounded shadow"
            />
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Thêm phim
          </button>
        </div>
      </form>
    </div>
  );
}
