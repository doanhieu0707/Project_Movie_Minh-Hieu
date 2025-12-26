import { movieApi } from "./movieApi";

export const userApi = {
    // Đăng nhập
    login: (data) => movieApi.post("/QuanLyNguoiDung/DangNhap", data),

    // Đăng ký
    register: (data) => movieApi.post("/QuanLyNguoiDung/DangKy", data),

    // Lấy danh sách người dùng
    getUsers: (keyword = "") =>
        movieApi.get(
            `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01${
                keyword ? `&tuKhoa=${keyword}` : ""
            }`
        ),

    // Loại người dùng
    getUserTypes: () =>
        movieApi.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"),

    // Phân trang
    getUsersPaging: (page, pageSize, keyword = "") =>
        movieApi.get(
            `/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}${
                keyword ? `&tuKhoa=${keyword}` : ""
            }`
        ),

    // Thêm
    addUser: (data) => movieApi.post("/QuanLyNguoiDung/ThemNguoiDung", data),

    // Cập nhật
    updateUser: (data) =>
        movieApi.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data),

    // Xóa người dùng
    deleteUser: (taiKhoan) =>
        movieApi.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`),
};
