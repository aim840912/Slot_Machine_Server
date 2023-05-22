
import Route from "./route";
import AuthRoute from "../example/auth.route";
import UserRoute from "../controllers/user/user.route";
import MachineRoute from "../controllers/machine/machine.route"

export const router: Array<Route> = [
    // new AuthRoute(),
    new UserRoute(),
    new MachineRoute(),
];