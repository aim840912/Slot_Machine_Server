import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { getRandom } from './Utility/getRandomNum';
import { GetMultiples } from "./Utility/CalcMultiple";
import { log } from 'console';


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/machine', (req: Request, res: Response) => {

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
})

const port: number = 3000;

app.listen(port, function () {
    console.log("Listening on " + port);
});
