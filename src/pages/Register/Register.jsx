import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await userApi.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.content || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Đăng ký
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input name="taiKhoan" placeholder="Tài khoản" onChange={handleChange} required className="p-3 border rounded" />
          <input type="password" name="matKhau" placeholder="Mật khẩu" onChange={handleChange} required className="p-3 border rounded" />
          <input name="hoTen" placeholder="Họ tên" onChange={handleChange} required className="p-3 border rounded" />
          <input name="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded" />
          <input name="soDt" placeholder="Số điện thoại" onChange={handleChange} required className="p-3 border rounded md:col-span-2" />

          <button
            disabled={loading}
            className="md:col-span-2 bg-red-500 text-white py-3 rounded-lg"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-red-500">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
