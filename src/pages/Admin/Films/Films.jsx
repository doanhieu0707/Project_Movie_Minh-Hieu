import { useEffect, useState } from "react";
import { movieApi } from "../../../api/movieApi";
import { useNavigate, NavLink } from "react-router-dom";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * Check Admin
   */
  useEffect(() => {
    if (!user || user.maLoaiNguoiDung !== "QuanTri") {
      alert("Bạn không có quyền truy cập");
      navigate("/");
    }
  }, []);


  const fetchFilms = () => {
    movieApi
      .get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((res) => setFilms(res.data.content));
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleDelete = async (maPhim) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa phim này?")) return;

    try {
      await movieApi.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      alert("Xóa phim thành công");
      fetchFilms();
    } catch (err) {
      alert(err.response?.data?.content || "Xóa phim thất bại");
    }
  };

  const filteredFilms = films.filter((film) =>
    film.tenPhim.toLowerCase().includes(search.toLowerCase()) ||
    film.maPhim.toString().includes(search)
  );

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Quản lý Phim</h2>

        <button
          onClick={() => navigate("/admin/films/addnew")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm phim
        </button>
      </div>

      <input
        placeholder="Nhập tên phim hoặc mã phim"
        className="border px-3 py-2 w-full mb-4 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Mã phim</th>
            <th className="border p-2">Hình ảnh</th>
            <th className="border p-2">Tên phim</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filteredFilms.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                Không tìm thấy phim
              </td>
            </tr>
          ) : (
            filteredFilms.map((film) => (
              <tr key={film.maPhim}>
                <td className="border p-2 text-center">{film.maPhim}</td>

                <td className="border p-2">
                  <img
                    src={film.hinhAnh}
                    alt={film.tenPhim}
                    className="w-16 mx-auto"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/80x120?text=No+Image")
                    }
                  />
                </td>

                <td className="border p-2">{film.tenPhim}</td>

                <td className="border p-2">
                  {film.moTa?.slice(0, 40)}...
                </td>

                <td className="border p-2 text-center space-x-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/films/edit/${film.maPhim}`)
                    }
                    className="text-blue-600 text-lg"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button
                    onClick={() => handleDelete(film.maPhim)}
                    className="text-red-600 text-lg"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <NavLink
                    to={`/admin/films/showtime/${film.maPhim}`}
                    className="text-green-600 text-lg"
                    title="Tạo lịch chiếu"
                  >
                    <i className="fa-solid fa-calendar-plus"></i>
                  </NavLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
