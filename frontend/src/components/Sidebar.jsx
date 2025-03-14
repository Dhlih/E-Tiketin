import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

// icons
import { RiPagesLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaTicketAlt } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = ({ isOpen }) => {
  const [active, setActive] = useState("Halaman Saya");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/logout`,
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      name: "Halaman Saya",
      icon: <RiPagesLine size={20} />,
      path: "/my-pages",
    },
    {
      name: "Analisis",
      icon: <TbBrandGoogleAnalytics size={20} />,
      path: "/analysis",
    },
    { name: "Transaksi", icon: <LuHistory size={20} />, path: "/transaction" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 h-screen  outline-1 outline-[#D8DBE0] shadow z-20 md:bg-[#F9FAFB] bg-white md:flex flex-col ${
        isOpen ? "flex flex-col" : "hidden"
      }`}
    >
      <h3 className="font-semibold text-lg px-7 py-[1.3rem] ">
        <Link to="/" className="flex gap-[0.5rem] items-center">
          <FaTicketAlt size={25} />
          <span>e-Tiketin</span>
        </Link>
      </h3>
      <ul className="w-full space-y-5 px-8 mt-[2rem] md:mr-[2rem] mr-[3.5rem] text-sm">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`cursor-pointer rounded-md transition hover:bg-[#dadad7] ${
              pathname === item.path ? "bg-[#dadad7]" : "bg-none"
            }`}
            onClick={() => setActive(item.name)}
          >
            <Link
              to={item.path}
              className="flex gap-[0.8rem] items-center p-2 "
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto px-8 py-5 ">
        <div className="line w-full h-[1px] rounded-md bg-[#D8DBE0]"></div>
        <button
          className="w-full py-2 mt-2 cursor-pointer flex items-center gap-[0.8rem] hover:bg-[#dadad7] rounded-md text-sm"
          onClick={handleLogout}
        >
          <TbLogout2 size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
