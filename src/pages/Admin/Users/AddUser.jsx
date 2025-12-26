import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/userApi";

export default function AddUser() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",               
    maLoaiNguoiDung: "KhachHang",
    maNhom: "GP01",        
  });

  useEffect(() => {
    userApi.getUserTypes().then((res) => {
      setTypes(res.data.content || []);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userApi.addUser(form);
      alert("Thêm người dùng thành công");
      navigate("/admin/users");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.content || "Thêm thất bại");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Thêm người dùng</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <Input label="Tài khoản" name="taiKhoan" onChange={handleChange} />
        <Input label="Mật khẩu" name="matKhau" type="password" onChange={handleChange} />
        <Input label="Họ tên" name="hoTen" onChange={handleChange} />
        <Input label="Email" name="email" onChange={handleChange} />
        <Input label="Số điện thoại" name="soDT" onChange={handleChange} />

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
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Thêm
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
      <input {...props} required className="w-full border px-3 py-2 rounded" />
    </div>
  );
}
