import { FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full mt-[7rem] bg-[#F9FAFB] pt-[3rem] px-[2rem]">
      <div className=" max-w-[1100px] mx-auto ">
        <div className="link-group flex md:flex-row flex-col justify-between items-center">
          <div>
            <h3 className="font-semibold text-xl ">
              <Link to="/" className="flex gap-[0.5rem] items-center">
                <FaTicketAlt size={25} />
                <span>e-Tiketin</span>
              </Link>
            </h3>
            <p className="mt-2 opacity-90 md:max-w-[60%] w-full">
              Buat pemesanan tiket Anda menjadi online dengan mudah dan cepat
            </p>
          </div>

          {/* link group */}
          <div className="flex gap-[3rem] mt-[1.5rem] ">
            <div>
              <h4 className="font-medium mb-2">Produk</h4>
              <ul className="space-y-2 opacity-70">
                <li>
                  <a href="">Features</a>
                </li>
                <li>
                  <a href="">How it works</a>
                </li>
                <li>
                  <a href="">Pricing</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Perusahaan</h4>
              <ul className="space-y-2 opacity-70">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Blog</a>
                </li>
                <li>
                  <a href="">Contacts</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Ikuti kami</h4>
              <ul className="space-y-2 opacity-70">
                <li>
                  <a href="">Instagram</a>
                </li>
                <li>
                  <a href="">Facebook</a>
                </li>
                <li>
                  <a href="">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="line bg-[#D8DBE0] w-full h-[0.5px] mt-[3rem]"></div>
        <p className="text-center my-[1.5rem]">
          © 2025 e-Tiketin. All rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
