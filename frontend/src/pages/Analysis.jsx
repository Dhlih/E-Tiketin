import Sidebar from "../components/Sidebar";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { TbTicket } from "react-icons/tb";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Analysis = () => {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = window.location.origin;

  useEffect(() => {
    console.log(user);
    handleFetchData();
  }, [user]);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/transactions/${user?.id}`
      );
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-[#F9FAFB]">
      <Sidebar isOpen={isOpen} />
      <Sidebar />
      <Navbar onMenuClick={handleToggleSidebar} isOpen={isOpen} />
      {/* main */}
      <div className="main md:max-w-[75%] w-full md:ml-[14rem] py-[2.5rem] md:px-[4rem] px-[2.5rem] mt-[4rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Analisis</h1>
          <div className="flex items-center gap-2 py-2 px-4 rounded-md bg-black text-white outline-1 outline-[#D8DBE0]">
            <select className="text-sm outline-none cursor-pointer bg-black text-white">
              <option value="7" className="text-white">
                7 Hari Terakhir
              </option>
              <option value="30" className="text-white">
                30 Hari Terakhir
              </option>
              <option value="today" className="text-white">
                Hari Ini
              </option>
              <option value="all" className="text-white">
                Semua Waktu
              </option>
            </select>
          </div>
        </div>

        {/* content */}
        <div className="content mt-[2.5rem] rounded-lg">
          <div className="card-group flex md:flex-row flex-col justify-between md:gap-[2rem] gap-[1rem] ">
            {/* di sini mulainya */}
            <div className="card md:max-w-[280px] w-full p-4 bg-white outline-1 outline-[#D8DBE0] shadow rounded-lg">
              <h3 className="text-sm opacity-90">Total Saldo</h3>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-medium">{items?.totalRevenue}</h2>
                <FaRegMoneyBill1 size={20} className="opacity-60" />
              </div>
            </div>

            <div className="card md:max-w-[280px]  w-full p-4 bg-white outline-1 outline-[#D8DBE0] shadow rounded-lg">
              <h3 className="text-sm opacity-90">Tiket Terjual</h3>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-medium">{items?.totalTickets}</h2>
                <TbTicket size={20} className="opacity-60" />
              </div>
            </div>

            <div className="card md:max-w-[280px]  w-full p-4 bg-white outline-1 outline-[#D8DBE0] shadow rounded-lg">
              <h3 className="text-sm opacity-90">Total Kunjungan</h3>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-medium">{items?.totalViews}</h2>
                <MdOutlineRemoveRedEye size={20} className="opacity-60" />
              </div>
            </div>
          </div>

          {/* Kinerja Halaman */}
          <div className="page-performance mt-[2rem] py-2 rounded-lg bg-white outline-1 outline-[#D8DBE0] shadow">
            <h2 className="text-lg mb-4 ml-5 mt-2 font-medium">
              Kinerja Halaman
            </h2>
            <div className="overflow-x-auto bg-white ">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Nama Halaman</th>
                    <th className="px-6 py-3">Dilihat</th>
                    <th className="px-6 py-3">Tiket Terjual</th>
                    <th className="px-6 py-3">Pendapatan</th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">
                  {items?.pages.map((item) => (
                    <tr>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold">{item.title}</div>
                          <Link
                            to={`${baseUrl}/${item.pageName}`}
                            className="text-xs text-blue-500"
                          >
                            {`${baseUrl}/${item.pageName}`}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.views}</td>
                      <td className="px-6 py-4">{item.ticketsSold}</td>
                      <td className="px-6 py-4">{item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
