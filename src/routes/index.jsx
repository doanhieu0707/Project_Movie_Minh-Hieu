import { createBrowserRouter } from "react-router-dom";
import HomeTemplate from "../templates/HomeTemplate";
import AdminTemplate from "../templates/AdminTemplate";

import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import History from "../pages/History/History";
import About from "../pages/About/About";

import Films from "../pages/Admin/Films/Films";
import AddFilm from "../pages/Admin/Films/AddFilm";
import EditFilm from "../pages/Admin/Films/EditFilm";
import Showtime from "../pages/Admin/Films/Showtime";
import Users from "../pages/Admin/Users/Users";
import AddUser from "../pages/Admin/Users/AddUser";
import EditUser from "../pages/Admin/Users/EditUser";

const router = createBrowserRouter([
    // ===== USER =====
    {
        element: <HomeTemplate />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/detail/:id", element: <Detail /> },
            { path: "/checkout/:maLichChieu", element: <Checkout /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/history", element: <History /> },
            { path: "/about", element: <About /> },
        ],
    },

    // ===== ADMIN =====
    {
        path: "/admin",
        element: <AdminTemplate />,
        children: [
            // Danh sách phim
            { path: "films", element: <Films /> },

            // Thêm phim
            { path: "films/addnew", element: <AddFilm /> },

            // Sửa phim
            { path: "films/edit/:idFilm", element: <EditFilm /> },

            // Tạo lịch chiếu
            { path: "films/showtime/:maPhim", element: <Showtime /> },

            // Trang thông tin users
            { path: "users", element: <Users /> },

            // Thêm users
            { path: "users/add", element: <AddUser /> },

            // Edit users
            { path: "users/edit/:taiKhoan", element: <EditUser /> },
        ],
    },
]);

export default router;
