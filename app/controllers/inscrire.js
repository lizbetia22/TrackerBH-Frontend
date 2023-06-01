import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

class InscrireController extends BaseController {
    constructor() {
        super();
        this.elements = {
            name: document.getElementById('name'),
            lastName: document.getElementById('lastname'),
            nickname: document.getElementById('nickname'),
            age: document.getElementById('age'),
            email: document.getElementById('email'),
            password: document.getElementById('password'),
        };
        this.trackerModel = new trackerModel();
    }

    async createProfile() {
        try {
            const {
                name,
                lastName,
                nickname,
                age,
                email,
                password
            } = this.elements;
            let data = {
                "firstName": name.value, "lastName": lastName.value,
                "nickname": nickname.value, "age": age.value,
                "email": email.value, "password": password.value
            }
            let boolean =  this.validation()
            if(boolean === true){

                await this.trackerModel.createProfile(data)
                localStorage.setItem("isRegistered", true);

                navigate('login')
            }
        } catch (e) {
            let error = document.getElementById('errorEmail')
            if(e.message === `401`) {
                error.innerHTML = `<div class="alert my-alert-danger" role="alert">
  Cet email est déjà utilisé
</div>`
                this.setTimeoutAlert('errorEmail', 2000);

                Object.values(this.elements).forEach(element => {
                    if (element === email) {
                        element.classList.add('is-invalid');
                        document.getElementById('validEmail').innerHTML = `<h5 style="color: red; font-size: 12px">Cet email est déjà utilisé<h5/>`
                    }
                });
            }
        }

    }

}

export default () => window.InscrireController = new InscrireController()
