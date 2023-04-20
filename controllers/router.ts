
import Route from "./route";
import AuthRoute from "../example/auth.route";
import UserRoute from "./user/user.route";
import MachineRoute from "./machine/machine.route"

export const router: Array<Route> = [
    // new AuthRoute(),
    // new UserRoute(),
    new MachineRoute(),
];