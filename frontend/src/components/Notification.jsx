import React, { useEffect } from "react";
import Tick from "../img/tick.png";
import Cancel from "../img/cancel.png";

const Notification = ({ isSuccess, message, visible, setVisible }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, setVisible]);

  return (
    <div
      className={`notification bg-white text-center  py-2 px-6 rounded-lg absolute top-10 left-1/2 -translate-x-1/2 z-[100] shadow-md flex gap-[0.8rem] outline-1 outline-[#D8DBE0] items-center transition-opacity duration-500
        ${visible ? "opacity-100" : "opacity-0 pointer-events-auto"}`}
    >
      <img src={isSuccess ? Tick : Cancel} className="w-6" alt="" />
      <p>{isSuccess ? "Berhasil dilakukan" : "Gagal dilakukan"}</p>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
