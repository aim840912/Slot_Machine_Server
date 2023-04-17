const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user');


const signup = async (req, res, next) => {
    console.log(req);
    console.log("into signup router")
    const { name, account, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ account: account });
    } catch (err) {
        console.log(err);
        return next(error);
    }
    if (existingUser) {
        // console.log("already have User");
        return next("already have User");
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        console.log(err);
    }

    const createdUser = new User({
        name,
        account,
        money: 10000,
        password: hashedPassword,
    });

    try {
        await createdUser.save();
    } catch (err) {
        console.log(err);
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};

const login = async (req, res, next) => {
    console.log("into login router")
    const { account, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ account: account });
    } catch (err) {
        console.log(err);
    }

    if (!existingUser) {
        console.log("!existingUser");
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        console.log(
            "Could not log you in, please check your credentials and try again."
        );
    }

    if (!isValidPassword) {
        console.log("Invalid credentials, could not log you in.")
    }


    res.json({ userId: existingUser.name, account: existingUser.account, money: existingUser.money });
};
const updatePlayer = async (req, res, next) => {
    console.log("into update router")
    const { account, money } = req.body;
    console.log(account)
    console.log(money)
    let existingUser;
    try {
        existingUser = await User.findOne({ account: account });
    } catch (err) {
        console.log("cant find the user")
        return next(error);
    }
    existingUser.money = money;
    try {
        await existingUser.save();
    } catch (err) {
        console.log("cant save the user")

        return next(error);
    }

    res.json({});
};

exports.signup = signup;
exports.login = login;
exports.updatePlayer = updatePlayer;
