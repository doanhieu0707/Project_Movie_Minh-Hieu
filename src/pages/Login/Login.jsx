import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { movieApi } from "../../api/movieApi";

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await movieApi.post(
        "/QuanLyNguoiDung/DangNhap",
        form
      );
      login(res.data.content);

      navigate("/");
    } catch {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Login
        </h2>

        <input
          placeholder="Tài khoản"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, taiKhoan: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, matKhau: e.target.value })
          }
        />

        <button className="bg-red-500 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
