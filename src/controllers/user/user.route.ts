
import UserController from "./UserController"
import Route from "../route";
import { AuthMiddleware } from '../../middleware/AuthMiddleware'
import { loginRequest } from "../../example/AuthRequest";

class UserRoute extends Route {
    private userController = new UserController();

    constructor() {
        super();
        this.prefix = '/user';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post('/signup', this.userController.signup);
        this.router.post('/login', this.userController.login);
        // this.router.get('/login', AuthMiddleware, this.authController.echo);
        // this.router.post('/updatePlayer', loginRequest, this.authController.echo);
    }
}

export default UserRoute;