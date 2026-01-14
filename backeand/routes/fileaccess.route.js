const express = require("express");
const router = express.Router();
const Files = require("../models/files.model");
router.post("/addadminforfiles", async (req, res) => {
  try {
    const { filename, fileuploadedby } = req.body;
    const newFile = new Files({
      filename,
      fileuploadedby,
    });
    
    console.log("fileeeee",newFile)
    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/checkaccess',async (req, res) => {
  try {
    const { filename, currentadmin } = req.body;
    const file = await Files.findOne({ filename, fileuploadedby: currentadmin });
    if (file) {
      res.status(200).json({ message: "Access granted" });
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router;