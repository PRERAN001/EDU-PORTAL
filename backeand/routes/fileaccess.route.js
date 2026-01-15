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
router.post('/checkaccess', async (req, res) => {
  try {
    const { filename, currentadmin } = req.body;
    console.log("filename",filename)
    console.log("currentadmin",currentadmin)

    if (currentadmin === "naman@gmail.com") {
      return res.status(200).json({ message: "Access granted" });
    }

    const file = await Files.findOne({ filename:filename, fileuploadedby: currentadmin });
    console.log("fileeeee",file)

    if (file) {
      return res.status(200).json({ message: "Access granted" });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (err) {
    console.error('Error in checkaccess:', err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;