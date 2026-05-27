const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Токен:", token ? "есть " : "нет ");

  if (!token) {
    console.log(" Ошибка: нет токена");
    return res.status(401).json({ message: "Нет токена" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(" Токен валидный, пользователь:", decoded.id);
    next();
  } catch (error) {
    console.log(" Ошибка: неверный токен", error.message);
    return res.status(403).json({ message: "Неверный или просроченный токен" });
  }
};
