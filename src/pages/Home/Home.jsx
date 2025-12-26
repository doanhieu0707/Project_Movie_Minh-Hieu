import Banner from "../../components/Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";

export default function Home() {
  return (
    <main className="w-full">
      <Banner />
      <MovieList />
    </main>
  );
}
