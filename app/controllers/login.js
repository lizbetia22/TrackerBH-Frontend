import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

 class LoginController extends BaseController {
    constructor() {
        super();
        this.trackerModel = new trackerModel();

        if(window.displayDone){
            this.createdDone();
        }
        if (sessionStorage.getItem("token")) {
            this.userInfo();
        }
        this.elements = {
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            valid1: document.getElementById('valid1'),
            valid2: document.getElementById('valid2')
        };

    }

    createdDone(){
        let alert = document.getElementById('alert')
        alert.innerHTML = `<div class="alert alert-primary" role="alert">
    Votre compte a été créé avec succès
    </div>`
    }

    async getLogin(){
        const {
            email,
            password
        } = this.elements;
        let data = { "email" : email.value, "password" : password.value}
        try {
            this.validation()
            let token = await this.trackerModel.getTracker(data)
            sessionStorage.setItem('token', token.token)
            navigate ('homePage');
        } catch (e){
            document.getElementById("loginError").innerHTML = `<div class="alert alert-danger" role="alert">
                                                                    Votre e-mail et votre mot de passe ne correspondent pas 
                                                                </div>`
            Object.values(this.elements).forEach(element => {
                element.classList.remove('is-valid');
                element.classList.add('is-invalid');
            });
        }
    }

    async userInfo(){
        try {
            await this.trackerModel.getUserInfo(decodeToken().id_user)
        } catch (e) {
            console.log(e)
        }
        // ${userinfo.nickname}
        // ${userinfo.age}
    }

    validation() {
        const {
            email,
            password,
            valid1,
            valid2,
        } = this.elements;
        let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

        let boolean = true;

        if (email.value.length < 2) {
            email.classList.remove('is-valid')
            email.classList.add('is-invalid')
            valid1.innerHTML = `<h5 style="color: red; font-size: 12px">Incorrect value (minimum 2 caractères)<h5/>`
            boolean = false

        } else {
            email.classList.add('is-valid')
            email.classList.remove('is-invalid')
            valid1.innerHTML = ``
        }

        if(password.value.length < 6){
            password.classList.remove('is-valid')
            password.classList.add('is-invalid')
            valid2.innerHTML = `<h5 style="color: red; font-size: 12px">Le mot de passe doit faire au moins 6 caractères<h5/>`
            boolean = false

        } else {
            password.classList.add('is-valid')
            password.classList.remove('is-invalid')
            valid2.innerHTML = ``
        }

        if(!email.value.match(emailFormat)) {
            email.classList.add('is-valid')
            email.classList.add('is-invalid')
            valid1.innerHTML = `<h5 style="color: red; font-size: 12px">Votre email a incorrect value<h5/>`
            boolean = false

        } else{
            email.classList.add('is-valid')
            email.classList.remove('is-invalid')
            valid1.innerHTML = ``
        }

        return boolean
    }

}

export default () => window.LoginController = new LoginController()
