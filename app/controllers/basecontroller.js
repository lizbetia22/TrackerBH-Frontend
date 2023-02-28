export default class BaseController {
    constructor() {
        this.setBackButtonView('index')
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }
}
