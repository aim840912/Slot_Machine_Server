
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
        this.router.get('/signup', this.userController.signup);
        this.router.get('/login', this.userController.login);
        this.router.get('/updatePlayer', this.userController.updatePlayer);
        // this.router.get('/login', AuthMiddleware, this.authController.echo);
        // this.router.post('/updatePlayer', loginRequest, this.authController.echo);
    }
}

export default UserRoute;