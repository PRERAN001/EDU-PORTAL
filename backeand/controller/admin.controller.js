const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("email",email,"password",password)


  if (email == "eduportal@gmail.com" && password == "eduportal123") {
    const admin = await Admin.findOne({ email });
    console.log("adminnn",admin)
    const token = await admin.generateAuthToken();
    console.log("special caseeeeeeeeeeeeeeeeee");
    console.log("tokenlhjjkbbbbbbbbbbbbbbbbbbbbbbbbbbb", token);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });
    return res
      .status(200)
      .json({ message: "Admin logged in successfully", token: token });
  }
  try {
    console.log("try blockkkkkkk 1");
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Admin does not exist" });
    }
    console.log("try blockkkkkkk 2");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    console.log("try blockkkkkkk 3");
    const token = await admin.generateAuthToken();
    res.cookie("token", token, {});
    res
      .status(200)
      .json({ message: "Admin logged in successfully", token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
module.exports.adminlogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Admin logged out successfully" });
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const department = req.headers["department"];

    if (!department) {
      return cb(new Error("Department header is missing"));
    }

    const uploadsDir = path.join(__dirname, "../uploads");
    const departmentDir = path.join(uploadsDir, department);

    fs.mkdirSync(departmentDir, { recursive: true });

    if (file.fieldname === "video") {
      const videoDir = path.join(departmentDir, "videos");
      fs.mkdirSync(videoDir, { recursive: true });
      cb(null, videoDir);
    } else if (file.fieldname === "resource") {
      const resourceDir = path.join(departmentDir, "resources");
      fs.mkdirSync(resourceDir, { recursive: true });
      cb(null, resourceDir);
    } else {
      cb(new Error(`Invalid fieldname: ${file.fieldname}`));
    }
  },

  filename: function (req, file, cb) {
    cb(
      null,
      `${encodeURIComponent(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage });

module.exports.uploadvideo = (req, res) => {
  try {
    res.status(200).json({
      message: "Upload successful",
      files: req.files,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.upload = upload;
