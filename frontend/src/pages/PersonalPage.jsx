import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import axios from "axios";
import Tick from "../img/tick.png";
import Loading from "../components/Loading";
import { IoCloseOutline } from "react-icons/io5";

// icons
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { UserContext } from "../context/userContext";
import { GrLocation } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import NotFound from "./NotFound";

const PersonalPage = () => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [email, setEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFilled, setIsFilled] = useState(true);
  const [page, setPage] = useState();
  const { pageName } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("PageName dari useParams:", pageName); // Debugging
    fetchPage();
  }, []);

  const handleBuyTicket = async () => {
    console.log("klik");
    const total = page.ticketPrice * ticketQuantity;
    setTotalPayment(total);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/transactions/`,
        {
          pageName: page.pageName,
          visitorName,
          email,
          visitDate,
          totalPayment: total,
          ticketQuantity,
        }
      );

      // reset value
      setVisitDate("");
      setEmail("");
      setVisitorName("");
      setTicketQuantity(1);

      setShowNotif(true);
      setIsModalOpen(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = () => {
    setTicketQuantity(ticketQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (ticketQuantity <= 1) {
      setTicketQuantity(1);
    } else {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const fetchPage = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/api/pages/page/${pageName}`
      );
      setPage(response.data);
    } catch (error) {
      console.error(error);
      setPage(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  return (
    <div className="w-full flex justify-center items-center bg-[#F9FAFB] p-[2rem]">
      <div className="max-w-[580px] w-full mx-auto">
        <div className="flex justify-between mb-[1.5rem]">
          <Link
            to="/"
            className="font-semibold text-lg flex gap-[0.5rem] items-center cursor-pointer"
          >
            <FaTicketAlt size={25} />
            <span>e-Tiketin</span>
          </Link>
          <div className="space-x-6">
            <span>Help</span>
            <span>Contact</span>
          </div>
        </div>
        {/* content */}
        {page && (
          <div className="bg-white rounded-xl outline-1 outline-[#D8DBE0] shadow-md flex md:flex-row flex-col overflow-hidden p-5 md:gap-[1.5rem] gap-[1rem]">
            <div className="md:w-1/2 w-full flex flex-col">
              <img
                src={page.imageUrl}
                className="h-[215px] w-full rounded-lg object-cover"
                alt=""
              />
              <h1 className="font-semibold text-lg mt-3 mb-1">{page.title}</h1>
              <div className="space-y-3 mt-2 flex-1">
                <p className="flex gap-[0.7rem] items-center text-sm opacity-90 ">
                  <GrLocation size={16} />
                  <span>{page.location}</span>
                </p>

                <p className="flex gap-[0.7rem] items-center text-sm opacity-90 ">
                  <FaRegClock size={16} />
                  <span>
                    {page.openingTime} - {page.closingTime}
                  </span>
                </p>
              </div>

              <div className="social-media mt-auto space-y-2 flex justify-between items-center">
                <span className="md:mt-2 mt-4">Ikuti Kami</span>
                <div className="flex items-center gap-[1rem]">
                  <BsInstagram size={18} className="cursor-pointer" />
                  <RiFacebookCircleLine size={21} className="cursor-pointer" />
                  <FaXTwitter size={18} className="cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="line bg-[#D8DBE0] md:w-[0.5px] md:h-auto w-full h-[1px] rounded-md"></div>

            {/* right side */}
            <div className="md:w-1/2 w-full space-y-2">
              <h3 className="font-medium">Beli Tiket Anda</h3>
              <div className="flex justify-between bg-[#F3F4F6] py-2 px-3 rounded-lg text-sm mb-4">
                <span>Harga Tiket</span>
                <span className="font-medium">{page.ticketPrice}</span>
              </div>
              {/* input group */}
              <div className="input-group space-y-3">
                <div className="space-y-2 text-sm">
                  <h3>Nama Lengkap</h3>
                  <input
                    type="text"
                    className="w-full outline-1 outline-[#D8DBE0] rounded-md text-sm px-3 py-1"
                    onChange={(e) => setVisitorName(e.target.value)}
                    value={visitorName}
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <h3>Email</h3>
                  <input
                    type="text"
                    className="w-full outline-1 outline-[#D8DBE0] rounded-md text-sm px-3 py-1"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <h3>Tanggal</h3>
                  <input
                    type="date"
                    className="w-full outline-1 outline-[#D8DBE0] rounded-md text-sm px-3 py-1"
                    onChange={(e) => setVisitDate(e.target.value)}
                    value={visitDate}
                  />
                </div>

                <div className="space-y-2 text-sm ">
                  <h3>Jumlah Tiket</h3>

                  <div className="flex gap-[1rem] items-center outline-1 outline-[#D8DBE0] rounded-md text-sm">
                    <button
                      className=" outline-1 outline-[#D8DBE0] px-2 py-1 cursor-pointer"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span>{ticketQuantity}</span>
                    <button
                      className=" outline-1 outline-[#D8DBE0] px-2 py-1 cursor-pointer"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {!isFilled && (
                <p className="text-red-500 text-left text-sm mt-3">
                  * Harap isi semua form
                </p>
              )}

              <button
                onClick={() => {
                  if (!email || !ticketQuantity || !visitDate || !visitorName) {
                    console.log(email);
                    console.log(ticketQuantity);
                    console.log(visitDate);
                    console.log(visitorName);
                    setIsFilled(false);
                    return;
                  }
                  setIsModalOpen(true);
                }}
                className="bg-black py-2 text-white w-full rounded-md md:mt-[0.5rem] mt-[1rem] text-sm cursor-pointer"
              >
                Beli Tiket
              </button>
            </div>
          </div>
        )}
      </div>

      {/* edit button */}
      {user?.id === page?.userId && (
        <Link
          to="/my-pages"
          className="fixed md:bottom-8 bottom-24 right-10 bg-black p-3 rounded-full shadow cursor-pointer"
        >
          <MdOutlineModeEdit color="white" size={20} />
        </Link>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleBuyTicket();
        }}
      />

      {/* notif after purchase */}
      {showNotif && (
        <div className="fixed overlay inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-1 w-[280px] relative">
            <IoCloseOutline className="absolute top-3 right-3" />
            <img src={Tick} className="w-16 mx-auto" alt="" />
            <h2 className=" text-center">Pembayaran Berhasil</h2>
            <p className="text-center text-lg font-semibold">
              Rp. {totalPayment.toLocaleString("id-ID")}
            </p>

            <div className="space-y-3 text-sm mt-4">
              <div className="flex justify-between">
                <span className="opacity-80">Nama</span>
                <span>{visitorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Nama</span>
                <span>{page.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Tanggal Kunjungan</span>
                <span>{visitDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Jumlah Tiket</span>
                <span>{ticketQuantity}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-center mt-4">
              <button
                onClick={() => setShowNotif(false)}
                className="bg-black  text-white px-4 py-1 rounded-lg text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalPage;
