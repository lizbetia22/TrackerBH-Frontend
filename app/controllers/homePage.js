import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

class HomePageController extends BaseController {
    constructor() {
        super()
        this.trackerModel = new trackerModel()
        this.userLevelName();
        this.setNickname();
        this.userTaskName();
    }

    async setNickname() {
        let user_info = (await this.trackerModel.getUserInfo(decodeToken().id_user))
        document.getElementById('nickname').innerHTML = `${user_info.nickname}, ${user_info.age}`
    }

    logOut() {
        sessionStorage.clear()
        navigate('login')
    }

    async userLevelName() {
        try {
            let getUserLevel = (await this.trackerModel.getLevelUserId(decodeToken().id_user)).id_level
            let getLevel = await this.trackerModel.getNameLevel(getUserLevel)
            document.getElementById(`titleWeek`).innerHTML = `${getLevel.name_level}`
            document.getElementById(`numberOflevel`).innerHTML = `<h5 style="text-align: center">niveau-${getLevel.id_level}</h5>`

    } catch (e) {
            console.log(e)
        }
    }

    async userTaskName() {
        let card = document.getElementById('cardTask')
        let content = ''
        try {
            let getUserTask = (await this.trackerModel.getTaskUserId(decodeToken().id_user)).id_task
            let getTask = await this.trackerModel.getNameTask(getUserTask)
            console.log(getTask)
            getTask.forEach(Task => {
                content += `
                                <div style="display: flex">
                                <div class="col d-flex justify-content-center mt-4 align-items-center">
                                    <div class="card cardStyleTask" id="card">
                                        <div class="card-body">
                                            <div class="row fontInput">
                                                <div class="textcard">
                                                    <h5 class="titleTask">${Task.name_task}</h5>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="checkbox"  class="check">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clock timeBtn" viewBox="0 0 16 16">
                                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                </svg>
                                </div>
                                </div>`
            })
        } catch (e) {
            console.log(e)
        }
        card.innerHTML = content
    }

    async nextLevel() {
        let checkBoxes = document.querySelectorAll('.check')
        let allChecked = true;
        for (let i = 0; i < checkBoxes.length; i++) {
            if (!checkBoxes[i].checked) {
              allChecked = false;
                break;
            }
        }
        if (allChecked && checkBoxes.length > 0) {
            let id_user = decodeToken().id_user
            await this.trackerModel.updateLevel(id_user);
            this.userLevelName();
            await this.trackerModel.updateTask(id_user);
            this.userTaskName();
            checkBoxes.forEach((checkBox) => {
                checkBox.checked = false;
            });
            this.lastLevelAlert();

        } else {
            document.getElementById("alertLevel").innerHTML = `<div class="alert alert-danger" role="alert">
                                                          Not all checkboxes are checked
                                                      </div>`;
            setTimeout(() => {
                document.getElementById("alertLevel").style.display = "none";
            }, 1000);
            document.getElementById("alertLevel").style.display = "block"; // Reset the alert message
        }

    }

    async lastLevelAlert(){
        let currentLevel = await this.trackerModel.getUserLevelInfo(decodeToken().id_user)
        if (currentLevel && currentLevel.id_level === 9) {
            document.getElementById("lastLevel").innerHTML = `<div class="alert alert-warning" role="alert">
                                                      This is the last bonus level! You have finished list!
                                                  </div>`;
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById("lastLevel").innerHTML = "";
        } else {
            document.getElementById("lastLevel").innerHTML = "";
        }
    }


    //AIzaSyDrR0um2oFxgbiSNdgCbir4cG08LvzhHMM
    //AIzaSyDrR0um2oFxgbiSNdgCbir4cG08LvzhHMM

}

export default () => window.HomePageController = new HomePageController()
