const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        req.body.userid = decoded.userid;
        next();
      } else {
        res.send("please login first");
      }
    });
  } else {
    res.send("please login first:1");
  }
};
module.exports = { authenticate };
