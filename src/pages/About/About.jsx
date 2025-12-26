export default function About() {
    return (
        <div className="min-h-screen bg-slate-900 text-white px-6 py-16">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl font-bold text-red-500 text-center">
                    Movie Booking Website
                </h1>

                <p className="text-center text-gray-300">
                    Website đặt vé xem phim trực tuyến
                </p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Giới thiệu</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Movie Booking là nền tảng giúp người dùng dễ dàng xem
                        danh sách phim, lựa chọn rạp chiếu, giờ chiếu và đặt vé
                        nhanh chóng chỉ trong vài bước. Website được xây dựng
                        nhằm mang đến trải nghiệm đặt vé tiện lợi, hiện đại và
                        thân thiện với người dùng.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Chức năng chính</h2>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li>Xem danh sách phim đang chiếu</li>
                        <li>Xem chi tiết phim và lịch chiếu</li>
                        <li>Chọn ghế và đặt vé online</li>
                        <li>Đăng nhập / đăng ký tài khoản</li>
                        <li>Xem lịch sử đặt vé</li>
                        <li>Quản lý phim (Admin)</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Công nghệ sử dụng
                    </h2>
                    <ul className="list-disc pl-6 text-gray-300 space-y-2">
                        <li>ReactJS</li>
                        <li>React Router DOM</li>
                        <li>Tailwind CSS</li>
                        <li>Axios</li>
                        <li>API Movie CyberSoft</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
