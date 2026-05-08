const Submission = require("../models/Submission");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // уникальное имя файла: время и оригинальное расширение
    // пример: 1746394821000.jpg (время в плоть до миллисекунд чтобы ни у кого не совпадало)
  },
});

const upload = multer({ storage: storage });

router.get("/submission/my", async (req, res) => {
  try {
    const userId = req.query.userId;
    const submissions = await Submission.find({ user: userId })
      .populate("quest")
      .populate("user");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/submission", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("quest")
      .populate("user");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/submission", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    console.log("body:", req.body);
    console.log("file:", req.file);

    const submission = new Submission({
      quest: req.body.quest,
      user: req.body.user,
      status: "pending",
      image: req.file ? req.file.filename : null,
      date: req.body.date,
    });

    try {
      const savedSubmission = await submission.save();
      res.status(201).json(savedSubmission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

router.patch("/submission/:id", async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
