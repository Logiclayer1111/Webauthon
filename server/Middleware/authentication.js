const jwt = require("jsonwebtoken");
require("dotenv").config();
const token = process.env.TOKEN;

const verifyToken = (req, res, next) => {
  const tokenString = req.headers.authorization;
  const tkn = tokenString.split(" ")[1];
  if (tkn) {
    jwt.verify(tkn, token, (err, decoded) => {
      if (err) {
        return res.send({ status: 403, message: "Unauthorized Access!" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  } else {
    return res.send({ status: 401, message: "Please login!" });
  }
};

module.exports = { verifyToken };
