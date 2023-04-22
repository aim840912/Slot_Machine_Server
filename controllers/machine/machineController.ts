import { Request, Response, NextFunction } from "express";
import { GenerateRandomNum } from '../../Utility/GenerateRandomNum';
import { GetMultiples } from "../../Utility/CalcMultiple";
import User from '../../models/user';
class MachineController {
    GetNumber = (req: Request, res: Response) => {
        let arr: Array<number> = []

        for (let i = 0; i < 9; i++) {
            arr[i] = GenerateRandomNum(0, 9)
        }

        // console.log(arr);
        // console.log(GetMultiples(arr));


        try {
            res.json({ BoardNum: arr })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    SpinAction = async (req: Request, res: Response, next: NextFunction) => {
        const { userId: userId, InputValue: inputValue } = req.body;

        console.log(userId);
        console.log(inputValue);


        let arr: Array<number> = [9]
        let winMoney: number = 0;
        let isGetData: boolean = false;

        for (let i = 0; i < 9; i++) {
            arr[i] = GenerateRandomNum(0, 9)
            console.log(arr[i]);

        }

        winMoney += inputValue * GetMultiples(arr)
        console.log(inputValue * GetMultiples(arr));

        let existingUser: any;

        try {
            existingUser = await User.findById({ _id: userId });
        }
        catch (err) {
            console.log("cant find the user")
            return next(err);
        }
        console.log("existingUser.money" + existingUser.money);

        existingUser.money += winMoney;


        try {
            await existingUser.save();
            console.log("existingUser.save()");

        }
        catch (err) {
            console.log("cant save the user")

            return next(err);
        }

        isGetData = true;

        console.log("isGetData : " + isGetData);
        console.log("arr" + arr);


        // console.log(winMoney, arr, existingUser.money);

        res.status(200).json({ winMoney: winMoney, arr: arr, money: existingUser.money, isGetData: isGetData });
    }
}

export default MachineController;