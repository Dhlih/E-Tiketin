import { useState, useContext, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import CreatePageModal from "../components/CreatePageModal";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
import Navbar from "../components/Navbar";
import ConfirmationModal from "../components/ConfirmationModal";

// icons
import { IoAddOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { TbTicket } from "react-icons/tb";

const UserPages = () => {
  const { user } = useContext(UserContext);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [pages, setPages] = useState([]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pageId, setPageId] = useState(null);
  const [page, setPage] = useState(null);

  const baseUrl = window.location.origin;

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchPages();
  }, [user, isSuccess]);

  // Menangani klik di luar area page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId !== null) {
        const pageElement = document.querySelector(
          `[data-page-id="${openMenuId}"]`
        );
        if (pageElement && !pageElement.contains(event.target)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const handleCreate = () => {
    setIsCreate(true);
  };

  const fetchPages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/pages/${user.id}`
      );
      console.log(response.data);
      setPages(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrevValue = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/pages/id/${id}`
      );
      setPage(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyUrl = (page) => {
    const baseUrl = window.location.origin;
    navigator.clipboard
      .writeText(`${baseUrl}/page/${page.pageName}`)
      .then(() => {
        setOpenMenuId(null);
        setIsCopy(true);
      })
      .catch((err) => console.error("Gagal menyalin teks:", err));
  };

  const handleDelete = async (pageId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/pages/${pageId}`
      );
      console.log(response.data);
      fetchPages();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    setIsEdit(true);
  };

  return (
    <div className="w-full bg-[#F9FAFB] h-screen">
      <div className="flex relative  ">
        <Sidebar isOpen={isOpen} />
        <Sidebar />
        <Navbar onMenuClick={handleToggleSidebar} isOpen={isOpen} />

        {/* main */}
        <div className="main md:max-w-[70%] w-full md:ml-[14rem] py-[2rem] md:px-[4rem] px-[2.5rem] md:mt-0 ">
          <div className="w-full flex justify-between items-center md:mt-[4rem] mt-[5.5rem]">
            <h1 className="md:text-2xl text-xl font-semibold">Halaman Saya</h1>
            <button
              className="bg-black text-white py-2 px-4 rounded-md flex gap-[0.5rem] items-center cursor-pointer hover:bg-white outline-1 hover:text-black  transition-all duration-200"
              onClick={handleCreate}
            >
              <IoAddOutline />
              <span className="md:text-sm text-xs">Buat Halaman</span>
            </button>
          </div>
          <div className="content-group flex justify-between flex-wrap mt-[1.5rem] space-x-2 py-2 ">
            {pages?.length > 0 &&
              pages.map((page) => (
                <div
                  key={page._id}
                  className="content  lg:max-w-[340px] w-full bg-white shadow rounded-lg outline-1 outline-[#D8DBE0] overflow-hidden relative mb-[2.5rem]"
                  data-page-id={page._id} // Tambahkan atribut ini
                >
                  {/* Gambar dengan menu titik tiga */}
                  <div className="relative">
                    {/* menu button */}
                    <button
                      className="absolute top-5 right-6 cursor-pointer"
                      onClick={() => {
                        if (openMenuId === page._id) {
                          setOpenMenuId(null);
                        } else {
                          setOpenMenuId(page._id);
                        }
                      }}
                    >
                      <SlOptions size={20} />
                    </button>

                    {/* dot menu */}
                    {openMenuId === page._id && (
                      <div className="absolute top-11 right-5 bg-white shadow-md rounded-lg w-[120px] py-2 outline-1 outline-[#D8DBE0] z-30">
                        <button
                          className="block w-full text-left px-4 py-2  hover:bg-gray-100 text-sm cursor-pointer"
                          onClick={() => handleCopyUrl(page)}
                        >
                          Salin URL
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setIsEdit(true);
                            console.log(pages);
                            getPrevValue(page._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setPageId(page._id);
                            setIsDelete(true);
                            console.log(isDelete);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="card p-5">
                    <h3 className="font-medium text-lg">{page.title}</h3>

                    <div className="space-y-2 mt-3 text-xs">
                      <p className="flex gap-[0.5rem] items-center text-sm opacity-90 ">
                        <IoLocationOutline size={15} />
                        <span>{page.location}</span>
                      </p>

                      <p className="flex gap-[0.5rem] items-center text-sm opacity-90 ">
                        <GoClock />
                        <span>
                          {page.openingTime} - {page.closingTime}
                        </span>
                      </p>

                      <p className="flex gap-[0.5rem] items-center text-sm opacity-90 ">
                        <TbTicket />
                        <span>Rp. {page.ticketPrice}</span>
                      </p>
                    </div>

                    {/* Tombol Edit & Kunjungi */}
                    <div className="flex justify-between items-center gap-[1rem] text-sm mt-[1.5rem]">
                      <p className="opacity-90 text-sm mt-2">
                        Dibuat pada
                        <span className="ml-1">
                          {new Date(page.createdAt).toLocaleDateString("id-ID")}
                        </span>
                      </p>
                      <Link
                        to={`/${page.pageName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-5 text-center text-xs rounded-md cursor-pointer hover:bg-white hover:outline-1 hover:text-black bg-black text-white transition-all duration-200"
                      >
                        Kunjungi
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* conditional */}
          {isDelete && (
            <ConfirmationModal
              isOpen={true}
              onClose={() => setIsDelete(false)}
              onConfirm={() => {
                handleDelete(pageId);
                setIsDelete(false);
              }}
            />
          )}

          {isCreate && (
            <CreatePageModal
              setIsCreate={setIsCreate}
              setIsSuccess={setIsSuccess}
              isCreate={isCreate}
            />
          )}
          {isEdit && (
            <CreatePageModal
              setIsCreate={setIsCreate}
              setIsSuccess={setIsSuccess}
              isCreate={isCreate}
              isEdit={isEdit}
              page={page}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
        {isCopy && (
          <Notification
            isSuccess={isCopy}
            message={"Tersalin ke clipboard"}
            visible={isCopy}
            setVisible={setIsCopy}
          />
        )}
        {isSuccess && (
          <Notification
            isSuccess={isSuccess}
            visible={isSuccess}
            setVisible={setIsSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default UserPages;
