import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import User from '../../models/user';

class UserController {
    signup = async (req: Request, res: Response, next: NextFunction) => {

        console.log("into signup router")
        const { name, email, password } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ email: email });
        } catch (err) {
            console.log(err);
            return next(err);
        }
        if (existingUser) {
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
            email,
            money: 10000,
            password: hashedPassword,
        });

        try {
            await createdUser.save();
        } catch (err) {
            console.log(err);
        }

        res.status(201).json({ userId: createdUser.id, email: createdUser.email });
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        console.log("into login router")
        const { email, password } = req.body;

        let existingUser: any;

        try {
            existingUser = await User.findOne({ email });
        } catch (err) {
            console.log(err);
        }

        if (!existingUser) {
            return console.log("!existingUser");
        }

        let isValidPassword = false;

        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            console.log(err)
            console.log("Could not log you in, please check your credentials and try again.");
        }

        if (!isValidPassword) {
            console.log("Invalid credentials, could not log you in.")
        }

        res.json({ userId: existingUser._id, name: existingUser.name, money: existingUser.money });
    };

    updatePlayer = async (req: Request, res: Response, next: NextFunction) => {
        console.log("into update router")
        const { userId, money } = req.body;
        console.log(userId)
        console.log(money)
        let existingUser: any;
        try {
            existingUser = await User.findOne({ userId });
        } catch (err) {
            console.log("cant find the user")
            return next(err);
        }
        existingUser.money = money;
        try {
            await existingUser.save();
        } catch (err) {
            console.log("cant save the user")

            return next(err);
        }
        res.json({});
    };
}

export default UserController;