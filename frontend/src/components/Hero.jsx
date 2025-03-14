import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white md:mb-[3rem] md:py-0 ">
      <div className="text-center md:mt-[1rem] mt-[-1rem] space-y-4 ">
        <h1 className="font-semibold text-3xl md:max-w-[60%] max-w-[70%] mx-auto">
          Buat Halaman Pemesanan Tiket Anda dalam Hitungan Menit!
        </h1>
        <p className="md:max-w-[50%] max-w-[80%] mx-auto">
          Buat pemesanan tiket Anda menjadi online dengan mudah. Praktis, cepat,
          dan tetap profesional!
        </p>
        <Link to="/login" className="mt-2">
          <button className="bg-black text-white px-6 py-2 rounded-md cursor-pointer">
            Buat Halaman
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
