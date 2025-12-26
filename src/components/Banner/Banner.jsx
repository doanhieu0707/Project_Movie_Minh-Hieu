import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { movieApi } from "../../api/movieApi";

export default function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    movieApi
      .get("/QuanLyPhim/LayDanhSachBanner")
      .then((res) => setBanners(res.data.content));
  }, []);

  return (
    <div className="h-[300px] sm:h-[400px] md:h-[550px] lg:h-[700px]">
      <Carousel slideInterval={3000}>
        {banners.map((item) => (
          <img
            key={item.maBanner}
            src={item.hinhAnh}
            className="w-full h-full object-cover"
            alt="banner"
          />
        ))}
      </Carousel>
    </div>
  );
}
