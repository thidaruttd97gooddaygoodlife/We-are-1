const express = require('express');
const router = express.Router();
const cors = require('cors');
const { resourceUsage } = require('process');
const { SigninUser,test, SignupUser , getprofile } = require('../controllers/authController');


//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"

    })
)

router.get("/", test)
router.post('/Sign-up' , SignupUser)
router.post("/Sign-in" , SigninUser)
router.get("/profile", getprofile)


module.exports = router;