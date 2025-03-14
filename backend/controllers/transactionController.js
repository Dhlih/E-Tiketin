const Transaction = require("../models/transactionModel");
const mongoose = require("mongoose");
const Page = require("../models/pageModel");

const handlePurchase = async (req, res) => {
  const {
    pageName,
    visitorName,
    visitDate,
    ticketQuantity,
    totalPayment,
    email,
  } = req.body;

  console.log(req.body);

  try {
    const transaction = await Transaction.create({
      pageName,
      visitorName,
      visitDate,
      ticketQuantity,
      totalPayment,
      email,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ msg: "failed" });
  }
};

const handleGetData = () => {
  const { userId } = req.params;
  try {
    const transaction = Transaction.find({ userId });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateStatus = async (req, res) => {
  const { hasVisited } = req.body;
  const { transactionId } = req.body;

  try {
    const page = await Transaction.findOneAndUpdate(
      { transactionId },
      { hasVisited },
      {
        new: true,
      }
    );
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAnalyticsLast7Days = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Cari semua page milik user
    const userPages = await Page.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Kalau user belum punya page
    if (userPages.length === 0) {
      return res.status(200).json({
        totalRevenue: 0,
        totalTickets: 0,
        totalViews: 0,
        pages: [],
      });
    }

    // 2️⃣ Ambil semua pageId milik user
    const pageIds = userPages.map((page) => page._id);

    // 3️⃣ Ambil transaksi 7 hari terakhir dari page tersebut
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const transactions = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
          pageId: { $in: pageIds },
        },
      },
      {
        $group: {
          _id: "$pageId",
          totalRevenue: { $sum: "$totalPayment" },
          totalTickets: { $sum: "$ticketQuantity" },
        },
      },
    ]);

    const pagesWithAnalytics = userPages.map((page) => {
      const transactionData = transactions.find(
        (t) => t._id.toString() === page._id.toString()
      );

      return {
        pageId: page._id,
        title: page.title,
        pageName: page.pageName,
        views: page.views,
        ticketsSold: transactionData?.totalTickets || 0,
        revenue: transactionData?.totalRevenue || 0,
      };
    });

    // 5️⃣ Hitung total keseluruhan
    const totalRevenue = pagesWithAnalytics.reduce(
      (acc, curr) => acc + curr.revenue,
      0
    );
    const totalTickets = pagesWithAnalytics.reduce(
      (acc, curr) => acc + curr.ticketsSold,
      0
    );
    const totalViews = pagesWithAnalytics.reduce(
      (acc, curr) => acc + curr.views,
      0
    );

    res.status(200).json({
      totalRevenue,
      totalTickets,
      totalViews,
      pages: pagesWithAnalytics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal ambil analisis", error });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    console.log(userId);

    const userPages = await Page.find({ userId });

    console.log(userPages);

    const pageNames = userPages.map((page) => page.pageName);

    console.log(pageNames);

    const query = { pageName: { $in: pageNames } };

    const transactions = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      data: transactions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalData: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handlePurchase,
  getAnalyticsLast7Days,
  getTransactionHistory,
  updateStatus,
};
