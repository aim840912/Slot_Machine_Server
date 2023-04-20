import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { router } from "./controllers/router";

const app: express.Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(AuthMiddleware);// ! 全域使用  middleware example


for (const route of router) {
    app.use(route.getPrefix(), route.getRouter());
}

const port: number = 3000;

app.listen(port, function () {
    console.log("Listening on " + port);
});
