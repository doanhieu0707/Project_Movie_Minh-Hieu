import { useEffect, useState } from "react";
import { movieApi } from "../../api/movieApi";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieApi
      .get("/QuanLyPhim/LayDanhSachPhim")
      .then((res) => setMovies(res.data.content))
      .catch(console.log);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        <i className="fa-solid fa-film"></i>
        Danh sách phim
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.maPhim} movie={movie} />
        ))}
      </div>
    </div>
  );
}
