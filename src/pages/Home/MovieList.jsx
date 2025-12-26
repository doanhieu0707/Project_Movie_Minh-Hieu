import { useEffect, useState } from "react";
import { movieApi } from "../../api/movieApi";
import MovieCard from "../../components/MovieList/MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieApi
      .get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP02")
      .then((res) => setMovies(res.data.content));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      {movies.map((movie) => (
        <MovieCard key={movie.maPhim} movie={movie} />
      ))}
    </div>
  );
}
