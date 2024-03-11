const express=require("express");
const { signup, login, logout, getUser } = require("./contollers/auth");
const { addToFavourites, removeFromFavourites, getFavourites } = require("./contollers/feature");
const { verifyToken } = require("./middleware/verifyToken");
const router=express.Router();

//auth
router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/getUser",verifyToken,getUser);

//feature
router.post("/addToFavourites/:id",addToFavourites);
router.post("/removeFromFavourites/:id",removeFromFavourites);
router.get("/getFavourites/:id",getFavourites);

module.exports=router;