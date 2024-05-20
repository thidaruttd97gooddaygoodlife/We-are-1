const User = require('../Model/user');
const { hashPassword, comparePassword } = require('../password/password_manager');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json("test is working");
};

const SignupUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Name is required"
            });
        }
        if (!username) {
            return res.status(400).json({
                error: "Username is required"
            });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({
                error: "Password is required and should be at least 8 characters long"
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: "Email is already used"
            });
        }
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

const SigninUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Password does not match" });
        }

        const token = jwt.sign({ email: user.email, id: user._id, username: user.username }, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie("token", token).json(user)
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getprofile = (req, res) => {
const {token} = req.cookies
if(token) {
    jwt.verify(token,process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
    })
} else{
    res.json(null)
}
}

module.exports = {
    test,
    SignupUser,
    SigninUser,
    getprofile
};
