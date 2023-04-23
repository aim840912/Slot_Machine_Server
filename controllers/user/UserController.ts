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
            existingUser = await User.findOne({ email: email });
        } catch (err) {
            console.log(err);
        }

        if (!existingUser) {
            console.log("!existingUser");
            return res.status(400).json({ message: "Can't find User" });

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

    updatePlayer = async (req: Request, res: Response, next: NextFunction) => {

        const { userId, InputValue: inputValue } = req.body;

        console.log(userId)
        console.log(inputValue)

        let arr: Array<number> = [9]
        let winMoney: number = 0;

        for (let i = 0; i < arr.length; i++) {
            arr[i] = GenerateRandomNum(0, 9)
        }

        winMoney += inputValue * GetMultiples(arr)

        let existingUser: any;

        try {
            existingUser = await User.findOne({ userId });
        }
        catch (err) {
            console.log("cant find the user")
            return next(err);
        }

        existingUser.money += winMoney;

        try {
            await existingUser.save();
        }
        catch (err) {
            console.log("cant save the user")

            return next(err);
        }
        res.json({ winMoney, arr, money: existingUser.money });
    };
}

export default UserController;