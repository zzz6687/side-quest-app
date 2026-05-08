const Quest = require("../models/Quest");
const express = require("express");
const router = express.Router();

router.post("/quest", async (req, res) => {
  const quest = new Quest({
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
    category: req.body.category,
  });

  try {
    const savedQuest = await quest.save();
    res.status(201).json(savedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/quests", async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
