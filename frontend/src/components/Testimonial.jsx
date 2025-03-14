import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import "swiper/css/bundle";

const testimonials = [
  {
    name: "Ifad Yusuf",
    role: "Event Organizer",
    feedback:
      "Sangat praktis! Saya bisa menjual tiket konser tanpa ribet. Pembayarannya juga aman dan cepat!",
  },
  {
    name: "Siska Amelia",
    role: "Pemilik Tempat Wisata",
    feedback:
      "Dengan sistem ini, pengunjung bisa memesan tiket lebih mudah tanpa harus antre panjang di loket.",
  },
  {
    name: "Rizky Pratama",
    role: "Pengelola Kolam Renang",
    feedback:
      "Sistem e-ticketing ini sangat mempermudah operasional. Pengunjung tinggal scan barcode saat masuk, lebih efisien!",
  },
  {
    name: "Dewi Lestari",
    role: "Manajer Taman Hiburan",
    feedback:
      "Tiket online membuat pengunjung kami meningkat. Tidak perlu lagi mencetak tiket manual.",
  },
  {
    name: "Budi Santoso",
    role: "EO Festival Budaya",
    feedback:
      "Pengelolaan tiket festival jadi lebih tertata. Laporan pendapatan juga bisa langsung saya pantau dari dashboard.",
  },
  {
    name: "Anita Rahma",
    role: "Penyelenggara Event Lokal",
    feedback:
      "Sangat membantu dalam distribusi tiket acara lokal kami. Semua jadi lebih modern dan mudah dijangkau masyarakat.",
  },
];

const Testimonial = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.slidePrev) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.slideNext) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div
      className="w-full bg-[#F9FAFB] mt-[7rem] py-[5rem] px-[2rem]"
      id="testimoni"
    >
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-center font-semibold text-2xl">Apa Kata Mereka?</h2>
        <div className="flex gap-[1rem] mt-[2rem] items-center">
          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="md:block hidden outline-2 outline-black rounded-full p-1 cursor-pointer"
          >
            <GrFormPrevious size={20} />
          </button>

          {/* Swiper */}
          <Swiper
            spaceBetween={30}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              690: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="p-2">
                <div className="bg-white shadow rounded-lg p-6 text-sm h-[190px] flex flex-col justify-start outline-1 outline-[#D8DBE0] md:w-full ">
                  <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#F9FAFB] rounded-full flex items-center justify-center font-semibold  outline-1 outline-[#D8DBE0]">
                      {item.name[0]}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="text-gray-600">{item.role}</span>
                    </div>
                  </div>
                  <p className="text-sm">"{item.feedback}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="md:block hidden outline-2 outline-black rounded-full p-1 cursor-pointer"
          >
            <GrFormNext size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
