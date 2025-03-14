import { FiUploadCloud } from "react-icons/fi";

const ImageUpload = ({ setFile, image, setImage, isEdit, page }) => {
  console.log(image);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      // setFile(selectedFile);
    }
  };

  return (
    <div className="w-full">
      <h3 className="mb-2">Cover Gambar</h3>
      <label
        className={`w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer relative overflow-hidden ${
          image ? "p-0" : "py-4"
        }`}
      >
        {image ? (
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt="Uploaded preview"
            className="w-full h-30 object-cover object-center rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center">
            <FiUploadCloud size={25} className="text-gray-500 mb-2" />
            <p className="text-gray-600 text-sm">Pilih file dari penyimpanan</p>
            <p className="text-gray-400 text-xs">PNG atau JPG</p>
          </div>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
