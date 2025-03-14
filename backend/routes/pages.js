const express = require("express");
const router = express.Router();
const {
  getUserPages,
  getPersonalPage,
  createPage,
  deletePage,
  editPage,
  getPageById,
} = require("../controllers/pageController");

router.get("/:id", getUserPages);

router.get("/page/:pageName", getPersonalPage);

router.get("/id/:pageId", getPageById);

router.post("/create", createPage);

router.delete("/:id", deletePage);

router.put("/:pageId", editPage);

module.exports = router;
