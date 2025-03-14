import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="mt-[7rem] px-[3rem]">
      <div className="max-w-[1100px] mx-auto text-center space-y-2">
        <h2 className="font-semibold text-2xl">Mulai Sekarang</h2>
        <p className="opacity-90 md:w-full max-w-[90%] mx-auto">
          Bergabunglah dengan ribuan orang yang mempercayai e-Tiketin
        </p>
        <button className="bg-black text-white px-6 py-2 rounded-md mt-[1rem] ">
          <Link to="/login">Buat Halaman </Link>
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
