const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "fusemachines_AI_Tech_Company_of_Nepal");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed!!",
    });
  }
};
