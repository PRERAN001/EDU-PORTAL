const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// module.exports.adminreg = async (req,res) => {
//     const {email,password,name} = req.body;
//     const admin = await Admin.findOne({email});
//     if(admin){
//         return res.status(400).json({error:'Admin already exists'});
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newAdmin = await Admin.create({email,password:hashedPassword,name});
//     await newAdmin.save();
//     const token = await newAdmin.generateAuthToken();
//     res.cookie('token',token,{

//     })
//     res.status(201).json({message:'Admin registered successfully'});
// }
module.exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;

  if (email == "naman@gmail.com" && password == "naman123") {
    const admin = await Admin.findOne({ email });
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
      `${Date.now()}-${req.headers["department"]}-${encodeURIComponent(
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
