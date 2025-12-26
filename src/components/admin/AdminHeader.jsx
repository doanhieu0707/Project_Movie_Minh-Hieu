import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function AdminHeader() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div>
        {location.pathname === "/admin" && (
          <>
            <h1 className="text-xl font-bold">
              Xin chào, {user.hoTen}
            </h1>
            <p className="text-gray-500 text-sm">
              Chào mừng bạn đến trang quản trị hệ thống
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
          {user.hoTen?.charAt(0)}
        </div>
        <span className="text-sm">{user.taiKhoan}</span>
        <button
          onClick={handleLogout}
          className="text-red-500 text-sm hover:underline"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
