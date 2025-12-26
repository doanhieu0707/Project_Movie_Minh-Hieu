import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function HomeTemplate() {
  return (
    <div className="home-layout min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 px-3 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
