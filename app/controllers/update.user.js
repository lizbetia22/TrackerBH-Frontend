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

         const {elements} = this;
         elements.name.value = userGetInfo.firstName;
         elements.lastName.value = userGetInfo.lastName;
         elements.nickname.value = userGetInfo.nickname;
         elements.age.value = userGetInfo.age;
         elements.email.value = userGetInfo.email;
     }

     async updateProfile() {
         this.isTokenValid()
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
             if (boolean === true) {

                 await this.trackerModel.updateUser(data, decodeToken().id_user)
                 document.getElementById("alertError").innerHTML = `<div class="alert my-alert-sucess" role="alert">
                                                                         Votre compte a été modifié avec succès
                                                                    </div>`
                 this.setTimeoutAlert('alertError', 2000);
             }
             window.displayDone = true;

         } catch (e) {
             await this.validation();
             let error = document.getElementById('alertEmail')

             if (e.message === `401`) {
                 error.innerHTML = `<div class="alert my-alert-danger" role="alert">
  Cet email est déjà utilisé
</div>`
                 this.setTimeoutAlert('alertEmail', 2000);

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

export default () => window.UpdateUserController = new UpdateUserController()