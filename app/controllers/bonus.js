import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

class BonusController extends BaseController {
    constructor() {
        super();
        this.trackerModel = new trackerModel();
    }

    navigateHome(){
        navigate('homePage')
    }

}

export default () => window.BonusController = new BonusController()