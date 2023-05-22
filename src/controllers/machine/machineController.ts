import { Request, Response, NextFunction } from "express";
import { GenerateRandomNum } from '../../Utility/GenerateRandomNum';
import { GetMultiples } from "../../Utility/CalcMultiple";
import User from '../../models/user';

class MachineController {
    SpinAction = async (req: Request, res: Response, next: NextFunction) => {
        const { userId: userId, InputValue: inputValue } = req.body;

        let boardNum: Array<number> = [9]
        let winMoney: number = 0;
        let hasGetData: boolean = false;

        for (let i = 0; i < 9; i++) {
            boardNum[i] = GenerateRandomNum(0, 9)
        }

        winMoney = inputValue * GetMultiples(boardNum) / 8 - inputValue;

        let existingUser: any;

        try {
            existingUser = await User.findById({ _id: userId });
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
            return next(err);
        }

        hasGetData = true;
        console.log("arr :" + boardNum);

        res.status(200).json({ WinMoney: winMoney, BoardNum: boardNum, Money: existingUser.money, HasGetData: hasGetData });
    }
}

export default MachineController;