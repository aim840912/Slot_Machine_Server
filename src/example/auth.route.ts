
import AuthController from "./AuthController"
import Route from "../controllers/route";
import { AuthMiddleware } from '../middleware/AuthMiddleware'
import { loginRequest } from "./AuthRequest";

class AuthRoute extends Route {
    private authController = new AuthController();

    constructor() {
        super();
        this.prefix = '/auth';
        this.router.use(AuthMiddleware);
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/login', this.authController.echo);
        this.router.get('/login', AuthMiddleware, this.authController.echo);
        this.router.post('/login', loginRequest, this.authController.echo);
    }
}

export default AuthRoute;