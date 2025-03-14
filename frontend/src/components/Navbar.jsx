import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";

const Navbar = ({ onMenuClick, isOpen }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const userPages = location.pathname.startsWith("/my-pages");
  const analysis = location.pathname.startsWith("/analysis");
  const transaction = location.pathname.startsWith("/transaction");

  console.log(user);

  const createUsername = (userUsername) => {
    if (!userUsername) return "";
    const parts = userUsername.split(" ");
    const first = parts[0] || "";
    const initials =
      first[0]?.toUpperCase() + (first[first.length - 1] || "").toUpperCase();
    return initials;
  };

  const handleLogout = async () => {
    if (!user) return;

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

  return (
    <div
      className={`w-full outline-1 outline-[#D8DBE0] fixed top-0 right-0 left-0 bg-white z-50 px-[2rem] ${
        !userPages && !analysis ? "py-1" : "py-0"
      }`}
    >
      <div className="flex justify-between items-center py-3">
        <div className="font-semibold text-xl flex items-center gap-[1.5rem] ">
          {(userPages || analysis) && (
            <div>
              {!isOpen ? (
                <HiOutlineMenu
                  size={20}
                  className="cursor-pointer md:hidden block "
                  onClick={onMenuClick}
                />
              ) : (
                <IoCloseOutline
                  size={22}
                  className="cursor-pointer md:hidden block "
                  onClick={onMenuClick}
                />
              )}
            </div>
          )}
          <Link to="/" className="flex gap-[0.5rem] items-center">
            <FaTicketAlt size={25} />
            <h3>e-Tiketin</h3>
          </Link>
        </div>
        {!userPages && !analysis && !transaction && (
          <ul className="link-group md:flex space-x-10 md:visible hidden">
            <li>
              <a href="#definisi">Pengertian</a>
            </li>
            <li>
              <a href="#fitur">Fitur</a>
            </li>
            <li>
              <a href="#testimoni">Testimoni</a>
            </li>
          </ul>
        )}
        <div className="button-group space-x-3">
          {!userPages && !analysis && !transaction && (
            <button className=" ">
              {user ? (
                <Link
                  to="/my-pages "
                  className="py-3 md:px-6 px-4 outline-1 rounded-md outline-[#D8DBE0] text-sm cursor-pointer  hover:outline-black transition-all duration-200"
                >
                  Admin
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="py-3 md:px-6 px-4 outline-1 rounded-md outline-[#D8DBE0] text-sm cursor-pointer  hover:outline-black transition-all duration-200"
                >
                  Masuk
                </Link>
              )}
            </button>
          )}

          {!userPages && !analysis && !transaction && (
            <button className=" " onClick={handleLogout}>
              {/* kasih handle logout */}
              {user ? (
                <Link className="py-3 md:px-6 px-4 rounded-md text-sm cursor-pointer bg-black text-white transition-all duration-200">
                  Keluar
                </Link>
              ) : (
                <Link
                  className="py-3 md:px-6 px-4  rounded-md text-sm cursor-pointer bg-black text-white transition-all duration-200"
                  to="/register"
                >
                  Daftar
                </Link>
              )}
            </button>
          )}

          {(userPages || analysis || transaction) && (
            <div className="flex gap-[0.8rem] items-center ">
              <div className=" bg-[#F9FAFB] w-12 h-12 rounded-full flex items-center justify-center font-semibold  outline-1 outline-[#D8DBE0] py-2 px-5">
                <span>{createUsername(user?.name)}</span>
              </div>
              <span>{user?.name} </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
