import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

 class UpdateUserController extends BaseController {
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
        this.setInputValue();
    }

     async setInputValue() {
         const userGetInfo = await this.trackerModel.getUserInfo(decodeToken().id_user);

         const { elements } = this;
         elements.name.value = userGetInfo.firstName;
         elements.lastName.value = userGetInfo.lastName;
         elements.nickname.value = userGetInfo.nickname;
         elements.age.value = userGetInfo.age;
         elements.email.value = userGetInfo.email;
     }

     async updateProfile() {
         try {
             const {
                 name,
                 lastName,
                 nickname,
                 age,
                 email,
                 password
             } = this.elements;
             const data = {
                 "firstName": name.value, "lastName": lastName.value,
                 "nickname": nickname.value, "age": age.value,
                 "email": email.value, "password": password.value
             }
             let boolean = this.validation()
             if (boolean === false) {
                 await this.validation();
                 document.getElementById("alertError").innerHTML = `<div class="alert alert-danger" role="alert">
                                                                       Les données saisies sont incorrectes
                                                                    </div>`
                 this.setTimeoutAlert('alertError', 1000);
             } else {
                 await this.validation();
                 document.getElementById("alertOkay").innerHTML = `<div class="alert alert-success" role="alert">
                                                                        Votre compte a été modifié avec succès
                                                                    </div>`
                 this.setTimeoutAlert('alertOkay', 1000);
                 await this.trackerModel.updateUser(data, decodeToken().id_user)
             }

             window.displayDone = true;

     } catch (e) {
             await this.validation();
             let error = document.getElementById('alertEmail')
             if (e === 401) {
                 error.innerHTML = `<div class="alert alert-danger" role="alert">
               Il existe déjà un compte avec cet email
</div>`
                 this.setTimeoutAlert('alertEmail', 1000);
                 Object.values(this.elements).forEach(element => {
                     element.classList.remove('is-valid');
                     element.classList.add('is-invalid');
                 });
             }
         }
         }

}

export default () => window.UpdateUserController = new UpdateUserController()