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
            passwordConfirm: document.getElementById('password1'),
            valid1: document.getElementById('valid1'),
            valid2: document.getElementById('valid2'),
            valid3: document.getElementById('valid3'),
            valid4: document.getElementById('valid4'),
            valid5: document.getElementById('valid5'),
            valid6: document.getElementById('valid6'),
            valid7: document.getElementById('valid7'),
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

                await this.trackerModel.getProfile(data)
                localStorage.setItem("isRegistered", true);
                window.displayDone = true
                navigate('login')
            }
        } catch (e) {
            let error = document.getElementById('errorEmail')
            if(e === 401) {
                error.innerHTML = `<div class="alert alert-danger" role="alert">
  Cet email est déjà utilisé
</div>`

                Object.values(this.elements).forEach(element => {
                    element.classList.remove('is-valid');
                    element.classList.add('is-invalid');
                });

            }
            console.log(e)
        }

    }

    validation() {
        const {
            name,
            lastName,
            nickname,
            age,
            email,
            password,
            passwordConfirm,
            valid1,
            valid2,
            valid3,
            valid4,
            valid5,
            valid6,
            valid7
        } = this.elements;
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
        if (email.value.length < 2) {
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
       if(passwordConfirm.value !== password.value){
           passwordConfirm.classList.remove('is-valid')
           passwordConfirm.classList.add('is-invalid')
           valid7.innerHTML = `<h5 style="color: red; font-size: 12px">La confirmation ne correspond pas au mot de passe<h5/>`
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

export default () => window.InscrireController = new InscrireController()
