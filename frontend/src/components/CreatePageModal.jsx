import { IoCloseOutline } from "react-icons/io5";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import ImageUpload from "./ImageUpload";
import Notification from "./Notification";

const CreatePageModal = ({
  setIsCreate,
  setIsSuccess,
  isEdit,
  setIsEdit,
  page,
}) => {
  const [activeTab, setActiveTab] = useState("Detail");
  const [title, setTitle] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [location, setLocation] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [isFilled, setIsFilled] = useState(true);
  const [image, setImage] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isEdit && page) {
      console.log(page);

      setTitle(page.title);
      setTicketPrice(page.ticketPrice);
      setLocation(page.location);
      setOpeningTime(page.openingTime);
      setClosingTime(page.closingTime);
      setFacebook(page.facebook);
      setInstagram(page.instagram);
      setTwitter(page.twitter);
      setImage(page.imageUrl);
    }
  }, [page]);

  const handleEdit = async () => {
    let uploadedImageUrl = page.imageUrl;

    if (image instanceof File) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "e-tiketin");
      data.append("cloud_name", "dypgz4r4i");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dypgz4r4i/image/upload",
        data
      );
      uploadedImageUrl = uploadResponse.data.secure_url;
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/pages/page/${
          page._id
        }`,
        {
          title,
          ticketPrice,
          location,
          openingTime,
          closingTime,
          facebook,
          instagram,
          twitter,
          imageUrl: uploadedImageUrl,
        }
      );
      console.log(response.data);
      setIsSuccess(true);

      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    console.log("buat");
    if (
      !title ||
      !ticketPrice ||
      !location ||
      !openingTime ||
      !closingTime ||
      !image
    ) {
      setIsFilled(false);
      return;
    }

    setIsFilled(true);

    try {
      const data = new FormData();
      data.append("file", image);

      // data.append("file", file);

      data.append("upload_preset", "e-tiketin");
      data.append("cloud_name", "dypgz4r4i");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dypgz4r4i/image/upload",
        data
      );

      const uploadedImageUrl = uploadResponse.data.secure_url;

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/pages/create`,
        {
          userId: user.id,
          title,
          ticketPrice,
          location,
          openingTime,
          closingTime,
          imageUrl: uploadedImageUrl,
          facebook,
          instagram,
          twitter,
        }
      );

      setTitle("");
      setTicketPrice("");
      setLocation("");
      setOpeningTime("");
      setClosingTime("");
      setImage(null);
      setFacebook("");
      setInstagram("");
      setTwitter("");

      setIsSuccess(true);
      setIsCreate(false);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Gagal menyimpan halaman:", error);
    }
  };

  return (
    <div className="overlay flex justify-center items-center top-0 left-0 right-0 bottom-0 fixed md:px-0 px-[2rem]">
      <div className="shadow-md rounded-lg outline-1 outline-[#D8DBE0] max-w-[430px] w-full mx-auto p-5 bg-white">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-xl">
            {isEdit ? "Edit Halaman" : "Buat Halaman"}
          </h2>
          <IoCloseOutline
            size={28}
            className="cursor-pointer"
            onClick={() => {
              setIsCreate(false);
              setIsEdit(false);
            }}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-4">
          <div className="flex space-x-6 text-sm font-medium">
            {["Detail", "Sosial Media"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${
                  activeTab === tab
                    ? "border-b-2 border-black text-black"
                    : "border-b-2 border-transparent text-gray-600 hover:text-black hover:border-black"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Detail" && (
          <div className="space-y-2 text-sm">
            <div className="flex gap-4">
              <div className="w-full space-y-2">
                <h3>Nama Tiket</h3>
                <input
                  type="text"
                  className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-full space-y-2">
                <h3>Harga Tiket</h3>
                <input
                  type="text"
                  className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                  value={ticketPrice.toLocaleString("id-ID")}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\./g, ""); // hapus titik
                    const numberValue = Number(raw);
                    setTicketPrice(isNaN(numberValue) ? 0 : numberValue); // tetap angka
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3>Jam Operasional</h3>
              <div className="flex gap-4">
                <input
                  type="time"
                  className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
                <input
                  type="time"
                  className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3>Lokasi</h3>
              <input
                type="text"
                className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <ImageUpload
              setImage={setImage}
              isEdit={isEdit}
              page={page}
              image={image}
            />
            {/* <ImageUpload setFile={setFile} image={file} isEdit={isEdit} /> */}
          </div>
        )}

        {activeTab === "Sosial Media" && (
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <h3>Facebook</h3>
              <input
                type="text"
                className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <h3>Instagram</h3>
              <input
                type="text"
                className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <h3>Twitter</h3>
              <input
                type="text"
                className="w-full outline-1 outline-[#D8DBE0] rounded-md px-3 py-1"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>
        )}

        {!isFilled && <Notification message={"Harap isi semua form"} />}

        <button
          className="bg-black w-full text-center mt-[1.5rem] rounded-lg text-white py-2 text-sm cursor-pointer"
          onClick={isEdit ? handleEdit : handleCreate}
        >
          {isEdit ? "Edit Halaman" : "Buat Halaman"}
        </button>
      </div>
    </div>
  );
};

export default CreatePageModal;
