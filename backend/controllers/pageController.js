const Page = require("../models/pageModel");
const createPageName = require("../Helper/createPageName");

const getPersonalPage = async (req, res) => {
  const { pageName } = req.params;
  try {
    const page = await Page.findOneAndUpdate(
      { pageName },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!page) {
      return res.status(404).json({ msg: "Page tidak ditemukan" });
    }

    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

const getUserPages = async (req, res) => {
  const { id } = req.params;
  try {
    const pages = await Page.find({ userId: id });
    console.log(pages);
    res.status(200).json(pages);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getPageById = async (req, res) => {
  const { pageId } = req.params;
  console.log(pageId);
  try {
    const page = await Page.findOne({ _id: pageId });
    console.log(page);
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createPage = async (req, res) => {
  const {
    userId,
    title,
    ticketPrice,
    location,
    openingTime,
    closingTime,
    imageUrl,
    facebook,
    twitter,
    instagram,
  } = req.body;
  console.log(twitter);
  const pageName = await createPageName(title);

  try {
    const page = await Page.create({
      userId,
      title,
      ticketPrice,
      location,
      openingTime,
      closingTime,
      pageName,
      imageUrl,
      facebook,
      instagram,
      twitter,
    });
    res.status(200).json(page);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "failed", error: error.message });
  }
};

const deletePage = async (req, res) => {
  const { id } = req.params;
  try {
    const page = await Page.findOneAndDelete({ _id: id });
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ msg: "failed to delete" });
  }
};

const editPage = async (req, res) => {
  const { pageId } = req.params;
  const { title, ...info } = req.body;

  console.log("sedang edit");

  try {
    const updateData = { ...info };

    if (title) {
      updateData.title = title;
      updateData.pageName = await createPageName(title);
    }

    console.log(updateData);

    const page = await Page.findOneAndUpdate({ _id: pageId }, updateData, {
      new: true,
    });

    return res.status(200).json(page);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPage,
  getUserPages,
  getPersonalPage,
  deletePage,
  editPage,
  getPageById,
};
