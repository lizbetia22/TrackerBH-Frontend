import trackerModel from "../model/tracker.js";

export default class BaseController {
    //server repond pas
    constructor() {
        this.setBackButtonView('index')
        this.setTimeoutAlert('alertBasic', 10)
        this.trackerModel = new trackerModel()
        this.isTokenValid()
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    async isTokenValid() {
        if (sessionStorage.getItem("token")) {
            let jwt = sessionStorage.getItem("token")
            let jwtdecode = decodeToken(jwt)
            if (jwtdecode.exp <= Math.floor(Date.now() / 1000)) {
                sessionStorage.removeItem("token")
                localStorage.setItem("expiredToken", "true")
                navigate("login")
            } else {
                let new_token = await this.trackerModel.refreshToken(decodeToken().id_user)
                sessionStorage.removeItem("token")
                sessionStorage.setItem("token", new_token.token)

            }
        }
    }
    setTimeoutAlert(id, delay) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "block";
            setTimeout(function() {
                element.style.display = "none";
            }, delay);
        }
    }

    validation() {
        let name = document.getElementById('name')
        let  lastName = document.getElementById('lastname')
        let nickname = document.getElementById('nickname')
        let age = document.getElementById('age')
        let email = document.getElementById('email')
        let password = document.getElementById('password')
        let passwordConfirm = document.getElementById('password1')
        let valid1 = document.getElementById('validName')
        let valid2 = document.getElementById('validLastName')
        let valid3 = document.getElementById('validNick')
        let valid4 = document.getElementById('validAge')
        let valid5 = document.getElementById('validEmail')
        let valid6 = document.getElementById('validPassword')
        let valid7 = document.getElementById('validPasswordConfirm')
        let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

        let boolean = true;
        if (name.value.length < 2) {
            name.classList.remove('is-valid')
            name.classList.add('is-invalid')
            valid1.innerHTML = `<h5 style="color: red; font-size: 12px">La valeur est incorrrect (minimum 2 caractères)<h5/>`
            boolean = false
        } else {
            name.classList.remove('is-invalid')
            name.classList.add('is-valid')
            valid1.innerHTML = ``

        }
        if (lastName.value.length < 2) {
            lastName.classList.remove('is-valid')
            lastName.classList.add('is-invalid')
            valid2.innerHTML = `<h5 style="color: red; font-size: 12px">Incorrect value (minimum 2 caractères)<h5/>`
            boolean = false

        } else {
            lastName.classList.add('is-valid')
            lastName.classList.remove('is-invalid')
            valid2.innerHTML = ``

        }
        if (nickname.value.length < 2) {
            nickname.classList.remove('is-valid')
            nickname.classList.add('is-invalid')
            valid3.innerHTML = `<h5 style="color: red; font-size: 12px">Incorrect value (minimum 2 caractères)<h5/>`
            boolean = false

        } else {
            nickname.classList.add('is-valid')
            nickname.classList.remove('is-invalid')
            valid3.innerHTML = ``
        }
        if (email.value.length < 8) {
            email.classList.remove('is-valid')
            email.classList.add('is-invalid')
            valid5.innerHTML = `<h5 style="color: red; font-size: 12px">Incorrect value (minimum 2 caractères)<h5/>`
            boolean = false

        } else {
            email.classList.add('is-valid')
            email.classList.remove('is-invalid')
            valid5.innerHTML = ``
        }
        if(age.value < 10){
            age.classList.remove('is-valid')
            age.classList.add('is-invalid')
            valid4.innerHTML = `<h5 style="color: red; font-size: 12px">Vous n'avez pas l'age<h5/>`
            boolean = false

        } else {
            age.classList.add('is-valid')
            age.classList.remove('is-invalid')
            valid4.innerHTML = ``
        }
        if(password.value.length < 6){
            password.classList.remove('is-valid')
            password.classList.add('is-invalid')
            valid6.innerHTML = `<h5 style="color: red; font-size: 12px">Le mot de passe doit faire au moins 6 caractères<h5/>`
            boolean = false

        } else {
            password.classList.add('is-valid')
            password.classList.remove('is-invalid')
            valid6.innerHTML = ``
        }
        if(passwordConfirm.value.length < 6){
            passwordConfirm.classList.remove('is-valid')
            passwordConfirm.classList.add('is-invalid')
            valid7.innerHTML = `<h5 style="color: red; font-size: 12px">Le mot de passe doit faire au moins 6 caractères<h5/>`
            boolean = false

        } else {
            passwordConfirm.classList.add('is-valid')
            passwordConfirm.classList.remove('is-invalid')
            valid7.innerHTML = ``
        }
        if(passwordConfirm.value !== password.value) {
            passwordConfirm.classList.remove('is-valid')
            passwordConfirm.classList.add('is-invalid')
            valid7.innerHTML = `<h5 style="color: red; font-size: 12px">La confirmation ne correspond pas au mot de passe<h5/>`
            boolean = false

        } else if(passwordConfirm.value === password.value && passwordConfirm.value.length === 0) {
            passwordConfirm.classList.remove('is-valid')
            passwordConfirm.classList.add('is-invalid')
            valid7.innerHTML = `<h5 style="color: red; font-size: 12px"><h5/>`
            boolean = false
        } else{
            passwordConfirm.classList.add('is-valid')
            passwordConfirm.classList.remove('is-invalid')
            valid7.innerHTML = ``
        }
        if(!email.value.match(emailFormat)) {
            email.classList.add('is-valid')
            email.classList.add('is-invalid')
            valid5.innerHTML = `<h5 style="color: red; font-size: 12px">Votre email a incorrect value<h5/>`
            boolean = false

        } else{
            email.classList.add('is-valid')
            email.classList.remove('is-invalid')
            valid5.innerHTML = ``
        }

        return boolean
    }
}
