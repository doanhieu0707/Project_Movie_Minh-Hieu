import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/userApi";

export default function User() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 10;

  const fetchUsers = async (p = page) => {
    try {
      const res = await userApi.getUsersPaging(p, PAGE_SIZE, keyword);

      setUsers(res.data.content.items || []);
      setTotalPages(res.data.content.totalPages || 0);
      setPage(p);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleDelete = async (taiKhoan) => {
    if (!window.confirm(`Xóa tài khoản "${taiKhoan}" ?`)) return;

    try {
      await userApi.deleteUser(taiKhoan);
      alert("Xóa người dùng thành công");
      fetchUsers(page);
    } catch (err) {
      alert(err.response?.data?.content || "Xóa thất bại");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Quản lý người dùng
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-2 rounded w-1/3"
          placeholder="Nhập tài khoản hoặc họ tên"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          onClick={() => fetchUsers(1)}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Tìm
        </button>

        <button
          onClick={() => navigate("/admin/users/add")}
          className="ml-auto bg-green-600 text-white px-4 rounded hover:bg-green-700 transition"
        >
          + Thêm người dùng
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Tài khoản</th>
            <th className="border p-2">Họ tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">SĐT</th>
            <th className="border p-2">Loại</th>
            <th className="border p-2 text-center">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="text-center p-4"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.taiKhoan}>
                <td className="border p-2">
                  {u.taiKhoan}
                </td>
                <td className="border p-2">
                  {u.hoTen}
                </td>
                <td className="border p-2">
                  {u.email}
                </td>
                <td className="border p-2">
                  {u.soDt}
                </td>
                <td className="border p-2">
                  {u.maLoaiNguoiDung}
                </td>

                <td className="border p-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/users/edit/${u.taiKhoan}`
                        )
                      }
                      className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(u.taiKhoan)}
                      className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => fetchUsers(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40">
            Prev
          </button>

          {Array.from({ length: totalPages }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => fetchUsers(i + 1)}
                className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-600 text-white" : ""}`}
              >
                {i + 1}
              </button>
            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() => fetchUsers(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
