const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.headers("auth-token");
  const token = req.body.token;

  if (!token) return res.send("access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(401).send("Invalid Token");
  }
};
