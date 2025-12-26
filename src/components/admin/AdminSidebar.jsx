import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function AdminSidebar() {
  const { user } = useContext(UserContext);

  if (!user || user.maLoaiNguoiDung !== "QuanTri") return null;

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">CYBERSOFT</div>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "text-red-400" : "hover:text-red-400"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/films"
          className={({ isActive }) =>
            isActive ? "text-red-400" : "hover:text-red-400"
          }
        >
          Quản lý phim
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "text-red-400" : "hover:text-red-400"
          }
        >
          Quản lý người dùng
        </NavLink>

        <NavLink to="/" className="hover:text-red-400 mt-4 text-sm">
          Back Home
        </NavLink>
      </nav>
    </aside>
  );
}
