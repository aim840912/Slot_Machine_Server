import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { router } from './controllers/router';

import 'dotenv/config'

const app: express.Application = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(AuthMiddleware);// ! 全域使用  middleware example


for (const route of router) {
    app.use(route.getPrefix(), route.getRouter());
}

const port: number = 3000;

// 在變數後使用驚嘆號，是告訴 TypeScript 説這個變出不會是 null 或 undefined，
// 要記得這是一個 "assertion"，和 as 是一樣的意思。
mongoose
    .connect(process.env.DB_CONNECT!).then(() => {
        console.log('connect to mongo Altas')
    })
    .then(() => {
        app.listen(process.env.PORT || port);
    })
    .catch(err => {
        console.log(err);
    });
