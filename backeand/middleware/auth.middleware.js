const express = require('express');
const jsonwebtoken = require("jsonwebtoken");
module.exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    console.log("tokennnnn",token);
    console.log("auth middleware step 1");
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    console.log("auth middleware step 2");
    try {
        console.log("Verifying token:", token);
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("auth middleware step 3");
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ error: 'Invalid token' });
    }   
};