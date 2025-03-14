import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Transaction = ({ isOpen, handleToggleSidebar }) => {
  const [transactions, setTransactions] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    getPrevData(1);
    console.log(transactions);
  }, [user]);

  const getPrevData = async (page) => {
    console.log(user.id);
    console.log("klik");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/api/transactions/transaction/${user.id}?page=${page}&limit=5`
      );
      setTransactions(response.data.data);
      setTotalData(response.data.totalData);
      console.log(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/api/transactions/update/${id}`,
        { hasVisited: newStatus }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (hasVisited) => {
    return hasVisited
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...transactions];
    updated[index].status = newStatus;
    setTransactions(updated);
    setStatus(newStatus);
  };

  return (
    <div className="w-full bg-[#F9FAFB] min-h-screen">
      <div className="flex relative">
        <Sidebar isOpen={isOpen} />
        <Sidebar />
        <Navbar onMenuClick={handleToggleSidebar} isOpen={isOpen} />

        <div className="main md:max-w-[75%] w-full md:ml-[14rem] py-[2rem] md:px-[4rem] px-[2.5rem] ">
          <div className="flex items-center justify-between mt-[4.5rem]">
            <h1 className="md:text-2xl text-xl font-semibold ">
              Riwayat Transaksi
            </h1>
            <div className="flex items-center gap-2 py-2 px-4 rounded-md bg-black text-white outline-1 outline-[#D8DBE0]">
              <select className="text-sm outline-none cursor-pointer bg-black text-white">
                <option value="all" className="text-white">
                  Semua Waktu
                </option>
                <option value="30" className="text-white">
                  30 Hari Terakhir
                </option>
                <option value="today" className="text-white">
                  Hari Ini
                </option>
                <option value="7" className="text-white">
                  7 Hari Terakhir
                </option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Nama</th>
                    <th className="px-6 py-3">Halaman</th>
                    <th className="px-6 py-3">Jumlah</th>
                    <th className="px-6 py-3">Biaya</th>
                    <th className="px-6 py-3">Status Tiket</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((txn, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(txn.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {txn.visitorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {txn.pageName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {txn.ticketQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {txn.totalPayment.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusClass(
                            txn.hasVisited
                              ? "sudah digunakan"
                              : "belum digunakan"
                          )}`}
                          value={txn.hasVisited ? "sudah" : "belum"}
                          onChange={(e) => {
                            const newStatus =
                              e.target.value === "sudah" ? true : false;
                            handleStatusChange(index, newStatus); // update local state
                            updateStatus(txn._id, newStatus); // update ke server
                          }}
                        >
                          <option value="sudah">Sudah Digunakan</option>
                          <option value="belum">Belum Digunakan</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-500 px-6 py-3">
                  Showing {transactions?.length} of{" "}
                  {transactions?.length === 0 ? 0 : totalData} data
                </div>
                <div className="flex justify-end items-center gap-2 px-6 py-4">
                  {[1, 2, 3].map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`border px-3 py-1 rounded-md text-sm ${
                        activePage === pageNum
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setActivePage(pageNum); // tambahkan ini
                        getPrevData(pageNum);
                      }}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
