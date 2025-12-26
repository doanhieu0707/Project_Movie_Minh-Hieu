import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const user = JSON.parse(localStorage.getItem("USER_LOGIN"));

  if (!user) return <Navigate to="/login" replace />;

  if (user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" replace />;
  }

  return children;
}
