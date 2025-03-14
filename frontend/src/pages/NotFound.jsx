import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-7xl font-semibold">404</h1>
        <h2 className="text-2xl font-medium mt-2">Halaman Tidak Ditemukan</h2>
        <p className="opacity-90 max-w-[70%] mx-auto mb-7 mt-2">
          Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke
          halaman utama untuk melanjutkan.
        </p>
        <Link
          to="/"
          className="rounded-md px-5 py-3 bg-black text-white text-sm hover:bg-white hover:outline-1 hover:text-black"
        >
          Kembali Ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
