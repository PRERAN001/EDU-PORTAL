const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();
const adminModel = require('../models/admin.model');
const { authMiddleware } = require('../middleware/auth.middleware');



router.get('/admin', async (req, res) => {
    const admin = await adminModel.find();
    res.send(admin);
});

router.get('/user', async (req, res) => {
    const user = await userModel.find();
    res.send(user);
});

router.post('/remove', authMiddleware, async (req, res) => {
    console.log("remove step 1");
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) return res.status(404).send({ msg: "Admin not found" });
    console.log("remove step 2");
    const userExists = await userModel.findOne({ email: admin.email });
    if (userExists) {
        return res.status(400).send({ msg: "User with this email already exists." });
    }
    console.log("remove step 3");
    await userModel.create({ email: admin.email, name: admin.name, password: admin.password });
    await adminModel.deleteOne({ email: req.body.email });
    console.log("remove step 4");
    res.send({ "msg": "admin access removed" });
});

router.post('/give', authMiddleware,  async (req, res) => {
    console.log("give step 1");
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ msg: "User not found" });
    console.log("give step 2");
    const adminExists = await adminModel.findOne({ email: user.email });
    if (adminExists) {
        return res.status(400).send({ msg: "Admin with this email already exists." });
    }
    console.log("give step 3");
    await adminModel.create({ email: user.email, name: user.name, password: user.password });
    await userModel.deleteOne({ email: req.body.email });
    console.log("give step 4");
    res.send({ "msg": "admin access given" });
});

module.exports = router;