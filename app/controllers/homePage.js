import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

class HomePageController extends BaseController {
    constructor() {
        super()
        this.trackerModel = new trackerModel()
        this.isLevelCompleted();
        this.userLevelName();
        this.setNickname();
        this.userTaskName();
    }

    async setNickname() {
        let user_info = (await this.trackerModel.getUserInfo(decodeToken().id_user))
        document.getElementById('nickname').innerHTML = `${user_info.nickname}, ${user_info.age}`

    }

    async userLevelName() {
        try {
            let getUserLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level
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
            let getTask = await this.trackerModel.getAllTasksOfLevel(decodeToken().id_user)
            for (const Task of getTask) {
                const index = getTask.indexOf(Task);
                let getNameofTask = (await this.trackerModel.getNameTasks(Task.id_task)).name_task

                content += `
                                <div style="display: flex">
                                <div class="col d-flex justify-content-center mt-4 align-items-center">
                                    <div class="card cardStyleTask" id="card">
                                        <div class="card-body">
                                            <div class="row fontInput">
                                                <div class="textcard">
                                                    <h5 class="titleTask">${getNameofTask}</h5>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input id="checkbox-${index + 1}" onchange="HomePageController.checkedCheckbox(${index + 1})" type="checkbox" class="check">
                                </div>
                                </div>`
            }
        } catch (e) {
            console.log(e)
        }
        card.innerHTML = content
        await this.checkedCheckBoxTrue();
    }

    async checkedCheckbox(index) {

        const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
        const id_task = index + 7 * (userLevel - 1);

        if (id_task === 1 || id_task % 7 === 1) {
            await this.trackerModel.updateTaskTime(decodeToken().id_user, id_task)
            await this.trackerModel.updateCheckBox(decodeToken().id_user, id_task)
        } else {
            const dateTaskEnd = (await this.trackerModel.getIdTaskByUser(decodeToken().id_user, id_task - 1)).task_date_end;
            let date = new Date();
            date.setHours(date.getHours() + 1)
            date.setMinutes(date.getMinutes() - 1)
            let isoString = date.toISOString();

            if (isoString > dateTaskEnd) {
                await this.trackerModel.updateTaskTime(decodeToken().id_user, id_task)
                await this.trackerModel.updateCheckBox(decodeToken().id_user, id_task)
            } else {
                document.getElementById("alertLevel").innerHTML = `<div class="alert alert-danger" role="alert">
                                                         Vous avez passé moins que 1 minute sur tache
                                                      </div>`;
                document.getElementById("alertLevel").style.display = "block";
                setTimeout(() => {
                    document.getElementById("alertLevel").style.display = "none";
                }, 1500);

                let checkbox = document.getElementById(`checkbox-${index}`);
                checkbox.checked = false;

            }
        }

    }

    async checkedCheckBoxTrue() {
        const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
        for (let i = 1; i < 8; i++) {
            const id_task = i + 7 * (userLevel - 1);
            const getIdTask = (await this.trackerModel.getIdTaskByUser(decodeToken().id_user, id_task)).checkBox
            if (getIdTask) {
                let idCheckbox = `checkbox-${i}`
                document.getElementById(idCheckbox).checked = true;
            }


        }
    }

    async nextLevel() {
        try {
            const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            let allChecked = true
            for (let i = 1; i < 8; i++) {
                const id_task = i + 7 * (userLevel - 1);
                const getIdTask = (await this.trackerModel.getIdTaskByUser(decodeToken().id_user, id_task)).checkBox

                if (!getIdTask) {
                    allChecked = false
                }
            }
            if (allChecked) {
                await this.trackerModel.setNextLevel(decodeToken().id_user)
                this.userLevelName();
                for (let i = 1; i < 8; i++) {
                    const id_task = i + 7 * (userLevel - 1);

                    await this.trackerModel.setNextTasks(decodeToken().id_user, id_task)
                }
                this.userTaskName();
                this.lastLevelAlert();
                this.isLevelCompleted()
            } else {
                document.getElementById("alertLevel").innerHTML = `<div class="alert alert-danger" role="alert">
                                                          Not all checkboxes are checked
                                                      </div>`;
                document.getElementById("alertLevel").style.display = "block";
                setTimeout(() => {
                    document.getElementById("alertLevel").style.display = "none";
                }, 1000);
            }
        } catch (error) {
            console.log('An error occurred:', error)
        }

    }

    async lastLevelAlert() {
        let currentLevel = await this.trackerModel.getUserLevelInfo(decodeToken().id_user)
        if (currentLevel && currentLevel.id_level === 9) {
            navigate('bonus')
            document.getElementById("lastLevel").innerHTML = `<div class="alert alert-warning" role="alert">
                                                      This is the last bonus level! You have finished list!
                                                  </div>`;
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById("lastLevel").innerHTML = "";
        } else {
            document.getElementById("lastLevel").innerHTML = "";
        }
    }

    async isLevelCompleted() {
        const getUserLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
        const menuItems = document.querySelectorAll('.menu__item');
        menuItems.forEach((menuItem, index) => {
            const levelNumber = index + 1;
            if (levelNumber <= getUserLevel) {
                menuItem.removeAttribute('disabled');
            } else {
                menuItem.setAttribute('disabled', true);
            }
        });

    }


    //key api calendrier
    //AIzaSyDrR0um2oFxgbiSNdgCbir4cG08LvzhHMM
    //client secret
    //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
    //client id
    //608844270149-c9dubflpi2suv26bq4cmetfu9f8bjpns.apps.googleusercontent.com


}

export default () => window.HomePageController = new HomePageController()
