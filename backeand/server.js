const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const path = require('path');
const fs = require('fs');
const adminModel = require('./models/admin.model');

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://edu-portal-fys3.vercel.app",
//   "https://edu-portal-1-xlj8.onrender.com",
//   "https://edu-portal-1-xlj8.onrender.com",
// ];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://edu-portal-001.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "department"]
  })
);


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const accessrouter = require('./routes/access.route');
app.use('/access',accessrouter);



const mongoose = require('mongoose');
const {authMiddleware} = require('./middleware/auth.middleware');
const adminrouter = require('./routes/admin.route');
const userrouter = require('./routes/user.route');

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use('/stream', express.static(path.join(process.cwd(), 'uploads')));

app.get('/list/:dept', (req, res) => {
  const dept = req.params.dept;
  const videosDir = path.join(process.cwd(), 'uploads', dept, 'videos');
  fs.readdir(videosDir, (err, files) => {
    if (err) {
      console.error('Error reading videos directory', err);
      return res.status(404).json({ files: [] });
    }

    const videoFiles = files.filter(f => /\.(mp4|mkv|webm|mov)$/i.test(f));
    res.json({ files: videoFiles });
  });
});
mongoose.connect(process.env.mongo_uri).then(()=>{
    console.log('Connected to MongoDB');
})
const createadmin = async () => {
  try {
    if(await adminModel.findOne({email:'naman@gmail.com'})) return;
    const admin = new adminModel({
      email: 'naman@gmail.com',
      password: 'naman123',
      name: 'Naman'
    });
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};
createadmin();
app.use('/admin',adminrouter);
app.use('/user',userrouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
