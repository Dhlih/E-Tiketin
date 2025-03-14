import { RiSecurePaymentLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";
import { BiPalette } from "react-icons/bi";

const Features = () => {
  return (
    <div className="w-full px-[2rem] mt-[7rem] bg-white" id="fitur">
      <div className="max-w-[1000px] mx-auto text-center">
        <h2 className="font-semibold text-2xl ">Kenapa Pilih Kami?</h2>
        <div className="md:flex md:flex-row flex-col justify-center items-center mt-[3rem] md:space-y-0 space-y-4 ">
          <div className="p-4">
            <RiSecurePaymentLine className="mx-auto text-5xl" />
            <h3 className="font-medium text-xl">Pembayaran Aman</h3>
            <p className="max-w-[80%] mx-auto  mt-1 opacity-90">
              Menggunakan sistem yang terpercaya.
            </p>
          </div>

          <div className="p-4">
            <BiPalette className="mx-auto text-5xl" />
            <h3 className="font-medium text-xl">Tampilan Modern</h3>
            <p className="max-w-[80%] mx-auto mt-1 opacity-90">
              Desain halaman yang nyaman digunakan
            </p>
          </div>

          <div className="p-4">
            <BsLightningCharge className="mx-auto text-5xl" />
            <h3 className="font-medium text-xl ">Proses Cepat</h3>
            <p className="max-w-[80%] mx-auto m mt-1 opacity-90">
              Buat halaman dalam hitungan menit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
