const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (username === validUsername && password === validPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({
      message: 'Login successful',
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { adminLogin };
