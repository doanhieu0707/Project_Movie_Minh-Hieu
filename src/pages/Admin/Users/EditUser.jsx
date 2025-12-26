import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userApi } from "../../../api/userApi";

export default function EditUser() {
  const { taiKhoan } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    userApi.getUsers(taiKhoan).then((res) => {
      setForm({
        ...res.data.content[0],
        matKhau: "123456",  
        maNhom: "GP01",
      });
    });

    userApi.getUserTypes().then((res) => {
      setTypes(res.data.content || []);
    });
  }, [taiKhoan]);

  if (!form) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userApi.updateUser(form);
      alert("Cập nhật thành công");
      navigate("/admin/users");
    } catch (err) {
      console.log(err.response?.data);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Chỉnh sửa người dùng</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <Input label="Tài khoản" value={form.taiKhoan} disabled />
        <Input label="Mật khẩu" name="matKhau" value={form.matKhau} onChange={handleChange} />
        <Input label="Họ tên" name="hoTen" value={form.hoTen} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Số điện thoại" name="soDT" value={form.soDT} onChange={handleChange} />

        <div>
          <label className="block mb-1">Loại người dùng</label>
          <select
            name="maLoaiNguoiDung"
            value={form.maLoaiNguoiDung}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            {types.map((t) => (
              <option key={t.maLoaiNguoiDung} value={t.maLoaiNguoiDung}>
                {t.tenLoai}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/admin/users")} className="border px-4 py-2">
            Huỷ
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded" />
    </div>
  );
}
