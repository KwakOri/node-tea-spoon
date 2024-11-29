const getHomePage = (req, res) => {
  res.render("home/index");
};

const getLoginPage = (req, res) => {
  res.render("home/login");
};

module.exports = {
  getHomePage,
  getLoginPage,
};
