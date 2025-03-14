const Page = require("../models/pageModel");

const createPageName = async (placeName) => {
  let baseUrl = placeName.split(" ").join("-").toLowerCase();
  let pageName = baseUrl;
  let count = 1;

  while (await Page.findOne({ pageName })) {
    pageName = `${baseUrl}-${count}`;
    count++;
  }

  return pageName;
};

module.exports = createPageName;
