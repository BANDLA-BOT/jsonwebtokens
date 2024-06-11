
const jwt = require("jsonwebtoken");

const validate = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'Guruprasad'); // Replace 'your_secret_key' with your actual secret key
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
}

module.exports = validate;