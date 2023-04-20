import { Request, Response, NextFunction } from "express";
import { getRandom } from '../../Utility/getRandomNum';
import { GetMultiples } from "../../Utility/CalcMultiple";

class MachineController {
    GetNumber = (req: Request, res: Response) => {
        let arr: Array<number> = []

        for (let i = 0; i < 9; i++) {
            arr[i] = getRandom(0, 9)
        }

        console.log(arr);
        console.log(GetMultiples(arr));


        try {
            res.json({ BoardNum: arr })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default MachineController;