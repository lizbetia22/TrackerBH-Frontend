import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

 class LoginController extends BaseController {
    constructor() {
        super();
        this.trackerModel = new trackerModel();
        this.createdDone();
        this.serverError();
        this.expiredToken();

        this.elements = {
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            valid1: document.getElementById('validEmail'),
            valid2: document.getElementById('validPassword')
        };

        if (sessionStorage.getItem("token")){
            if (this.isTokenValidLogin()) {
                this.isConnected();
            }
        }
    }

     async isTokenValidLogin() {
        try {
            if (sessionStorage.getItem("token")) {
                let jwt = sessionStorage.getItem("token")
                let jwtdecode = decodeToken(jwt)
                if (jwtdecode.exp <= Math.floor(Date.now() / 1000)) {
                    sessionStorage.removeItem("token")
                    return false
                } else {
                    let new_token = await this.model.refreshToken(decodeToken().id_user)
                    sessionStorage.removeItem("token")
                    sessionStorage.setItem("token", new_token.token)
                    return true
                }
            }
            return false
        } catch (e) {
            return false
        }
     }

     async isConnected() {
         navigate("homePage")
     }

     logOut() {
         sessionStorage.removeItem("token")
         navigate("login")
     }

    createdDone(){
        let checkUser = localStorage.getItem('isRegistered')

        if (checkUser) {
            let alert = document.getElementById('alert')
            alert.innerHTML = `<div class="alert my-alert-sucess" role="alert">
                                    Votre compte a été créé avec succès
                               </div>`
            this.setTimeoutAlert('alert', 1500);
        }
        localStorage.removeItem('isRegistered')
    }

    async getLogin(){
        const {
            email,
            password
        } = this.elements;
        let data = { "email" : email.value, "password" : password.value}
        try {
            let boolean = this.validation()
            if(boolean === true) {
                let token = await this.trackerModel.getLogin(data)
                localStorage.setItem('login', "true")
                sessionStorage.setItem('token', token.token)
                navigate('homePage');
            } else {
                document.getElementById("loginError").innerHTML = `<div class="alert my-alert-danger" role="alert">
                                                                    Votre e-mail et votre mot de passe ne correspondent pas 
                                                                </div>`
                document.getElementById("loginError").style.display = "block";
                this.setTimeoutAlert('loginError', 1500);
                Object.values(this.elements).forEach(element => {
                    element.classList.remove('is-valid');
                    element.classList.add('is-invalid');
                });
            }
        } catch (error){
            if (error.message === `401`) {

                Object.values(this.elements).forEach(element => {
                    element.classList.remove('is-valid');
                    element.classList.add('is-invalid');
                });

                document.getElementById("loginError").innerHTML = `<div class="alert my-alert-danger" role="alert">
                                                                    Votre e-mail ou votre mot de passe est incorrect.
                                                                </div>`
                document.getElementById("loginError").style.display = "block";
                this.setTimeoutAlert('loginError', 1500);

            } else {

                Object.values(this.elements).forEach(element => {
                    element.classList.remove('is-valid');
                    element.classList.add('is-invalid');
                });

                document.getElementById("loginError").innerHTML = `<div class="alert my-alert-danger" role="alert">
                                                                   Votre e-mail ou votre mot de passe est incorrect.
                                                                </div>`
                document.getElementById("loginError").style.display = "block";
                this.setTimeoutAlert('loginError', 1500);

            }
        }
    }

    serverError(){
        let alertError = document.getElementById('serverError')
        if(localStorage.getItem('server error')) {
            localStorage.removeItem('server error')
            alertError.innerHTML = `<div class="alert my-alert-danger" role="alert">
                Erreur Serveur
            </div>`;
            this.setTimeoutAlert('serverError', 2500);
        }

    }

    expiredToken(){
        let alertToken = document.getElementById('tokenAlert')
        if(localStorage.getItem('expiredToken')) {
            localStorage.removeItem('expiredToken')
            alertToken.innerHTML = `<div class="alert my-alert-sucess" role="alert">
                                                                    Votre session est expiré
                                                                </div>`
            this.setTimeoutAlert('tokenAlert', 2000);
        }
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

        if (email.value.length < 8) {
            email.classList.remove('is-valid')
            email.classList.add('is-invalid')
            valid1.innerHTML = `<h5 style="color: red; font-size: 12px">Incorrect value (minimum 8 caractères)<h5/>`
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

        return boolean
    }

}

export default () => window.LoginController = new LoginController()
