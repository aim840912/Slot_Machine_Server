import { Router } from "express";

abstract class Route {
    protected router = Router();
    protected abstract setRoutes(): void;

    public getRouter() {
        return this.router;
    }

    protected prefix: string = '/';

    public getPrefix() {
        return this.prefix;
    }
}

export default Route;