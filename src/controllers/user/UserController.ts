import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import User from '../../models/user';
import MachineController from "../machine/machineController";
import { GenerateRandomNum } from '../../Utility/GenerateRandomNum';
import { GetMultiples } from "../../Utility/CalcMultiple";

class UserController {
    signup = async (req: Request, res: Response, next: NextFunction) => {

        console.log("into signup router")
        const { name, email, password } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ email: email });
        } catch (err) {
            console.log(err);
        }
        if (existingUser) {
            return res.status(400).json("already have User");
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
            existingUser = await User.findOne({ email: email });
        } catch (err) {
            console.log(err);
        }

        if (!existingUser) {
            console.log("!existingUser");
            return res.status(400).json("Can't find User");

        }

        let isValidPassword = false;

        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            console.log(err)
        }

        if (!isValidPassword) {
            console.log("Invalid credentials, could not log you in.")
            return res.status(400).send("Wrong Password");
        }

        res.json({ UserId: existingUser._id, Name: existingUser.name, Money: existingUser.money });
    };

}

export default UserController;