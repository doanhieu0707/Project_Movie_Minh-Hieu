import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdmin = user?.maLoaiNguoiDung === "QuanTri";

  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
      <h1
        className="text-red-500 text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        MOVIE
      </h1>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/about")}
          className="hover:text-red-500"
        >
          About
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-yellow-400 font-semibold"
          >
            Quản lý
          </button>
        )}

        {user && (
          <button
            onClick={() => navigate("/history")}
            className="hover:text-red-500"
          >
            Lịch sử đặt vé
          </button>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Hi, {user.taiKhoan}
              {isAdmin && (
                <span className="ml-2 text-xs text-yellow-400">
                  (Admin)
                </span>
              )}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hover:text-red-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="hover:text-red-500"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
