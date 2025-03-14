// module
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// icons
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";

// images
import Google from "../img/google.png";
import Twitter from "../img/twitter.png";
import Facebook from "../img/facebook.png";
import { UserContext } from "../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isFilled, setIsFilled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const hidePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setIsFilled(false);
      return;
    }

    try {
      setIsFilled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setUser(response.data);
      navigate("/my-pages");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F8F7F7] px-[3rem]">
      <div className="shadow-lg rounded-xl px-6 py-7 max-w-[320px] text-center bg-white outline-1 outline-[#D8DBE0]">
        <h3 className="font-semibold flex items-center justify-center">
          <Link to="/" className="flex gap-[0.5rem] items-center">
            <FaTicketAlt size={20} />
            <span>e-Tiketin</span>
          </Link>
        </h3>
        <h1 className="font-semibold md:text-xl text-lg mt-1 ">
          Selamat Datang Kembali!
        </h1>
        <p className="mb-[1rem] text-sm mt-1">
          Belum punya akun?
          <Link to="/register" className="text-[#007CFF] ml-1">
            Daftar aja dulu
          </Link>
        </p>

        <div className="input-group">
          <div className=" rounded-md px-4 py-2 flex items-center space-x-[1rem] outline-[#D8D8D8] outline-1 text-sm my-[1.4rem]">
            <MdOutlineEmail size={18} className="opacity-50" />
            <input
              type="text"
              placeholder="email"
              className="outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="rounded-md px-4 py-2 flex items-center space-x-[1rem]  outline-[#D8D8D8] outline-1  text-sm mb-[1.4rem]">
            <TbLockPassword size={23} className="opacity-50 " />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="password"
              className="outline-none w-full "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {isVisible ? (
              <AiOutlineEye
                size={25}
                className="ml-2 cursor-pointer"
                onClick={hidePassword}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                className="ml-2 cursor-pointer"
                onClick={hidePassword}
              />
            )}
          </div>
          {!isFilled && (
            <p className="text-red-400 text-left text-sm my-[1rem]">
              * All field must be filled
            </p>
          )}
          <button
            className="w-full text-white px-4 py-2 bg-black rounded-md text-sm cursor-pointer "
            onClick={handleLogin}
          >
            Masuk
          </button>
        </div>

        {/* atau */}
        <div className="flex items-center mt-[1rem]">
          <div className="line bg-[#D8D8D8] h-0.5 w-full rounded-full"></div>
          <span className="mx-2 text-sm">Atau</span>
          <div className="line bg-[#D8D8D8] h-0.5 w-full rounded-full"></div>
        </div>

        <div className="register-option flex justify-between items-center mt-3">
          <div className="px-8 py-2 shadow-md rounded-md cursor-pointer">
            <img src={Google} className="w-4 " alt="" />
          </div>
          <div className="px-8 py-2 shadow-md rounded-md cursor-pointer">
            <img src={Twitter} className="w-4 " alt="" />
          </div>
          <div className="px-8 py-2 shadow-md rounded-md cursor-pointer">
            <img src={Facebook} className="w-4 " alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
