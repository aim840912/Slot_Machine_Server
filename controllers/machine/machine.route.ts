
import MachineController from "./machineController"
import Route from "../route";

class MachineRoute extends Route {
    private machineController = new MachineController();

    constructor() {
        super();
        this.prefix = '/machine';
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get('/', this.machineController.GetNumber);
    }
}

export default MachineRoute;