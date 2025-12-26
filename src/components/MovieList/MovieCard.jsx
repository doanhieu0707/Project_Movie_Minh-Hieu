import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={movie.hinhAnh}
        alt={movie.tenPhim}
        className="w-full h-60 sm:h-72 md:h-80 lg:h-100 object-cover rounded"
      />

      <h3 className="font-bold mt-3 text-sm sm:text-base md:text-lg">
        {movie.tenPhim}
      </h3>

      <button
        onClick={() => navigate(`/detail/${movie.maPhim}`)}
        className="mt-4 w-full bg-red-500 text-white py-2 text-sm sm:text-base rounded hover:bg-red-600"
      >
        Đặt vé
      </button>
    </div>
  );
}
