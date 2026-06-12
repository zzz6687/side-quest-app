const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const questRoutes = require("./routes/quest");
const submissionRoutes = require("./routes/submission");
const cors = require("cors"); // CORS -  это механизм безопасности в браузерах, использующий HTTP-заголовки для разрешения доступа к ресурсам (например, API) с других доменов
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api", questRoutes);
app.use("/api", submissionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("Error:", err));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

setInterval(() => {
  fetch("https://side-quest-backend-yzes.onrender.com/")
    .then(() => console.log("activate server"))
    .catch(() => console.log("failed"));
}, 9 * 60 * 1000);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
