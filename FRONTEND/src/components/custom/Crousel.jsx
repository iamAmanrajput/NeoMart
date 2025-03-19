import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import heroimg1 from "../../assets/heroimg1.webp";
import heroimg2 from "../../assets/heroimg2.avif";
import heroimg5 from "../../assets/heroimg5.webp";
import heroimg4 from "../../assets/heroimg4.webp";

function Crousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      navigation={false} // ❌ Arrows disabled
      className="w-[92.5vw] mx-auto my-10 rounded-3xl"
    >
      <SwiperSlide>
        <img
          src={heroimg1}
          alt="Slide 1"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-3xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={heroimg2}
          alt="Slide 2"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-3xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={heroimg5}
          alt="Slide 3"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-3xl"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={heroimg4}
          alt="Slide 4"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-3xl"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Crousel;
