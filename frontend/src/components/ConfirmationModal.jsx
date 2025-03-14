const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
        <h2 className="font-semibold text-lg mb-2">Konfirmasi Pembelian</h2>
        <p className="text-sm text-gray-600 mb-4">
          Apakah Anda yakin ingin membeli tiket ini?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Tidak
          </button>
          <button
            onClick={onConfirm}
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
