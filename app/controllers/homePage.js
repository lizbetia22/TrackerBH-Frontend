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
        this.buttonBonusEnable();
        this.barMenu();
    }

    async setNickname() {
        let user_info = (await this.trackerModel.getUserInfo(decodeToken().id_user))
        document.getElementById('nickname').innerHTML = `${user_info.nickname}, ${user_info.age}`

    }

    async userLevelName() {
        try {
            let getUserLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            let getLevel = await this.trackerModel.getNameLevel(getUserLevel);
            document.getElementById(`titleWeek`).innerHTML = `${getLevel.name_level}`;
            document.getElementById(`numberOflevel`).innerHTML = `<h4 style="text-align: center">Niveau - ${getLevel.id_level}</h4>`;
            let progressPercentage = await this.calculateProgressPercentage();
            await this.updateProgress(progressPercentage);
            await this.updateRound(progressPercentage);
        } catch (e) {
            console.log(e);
        }
    }

    async calculateProgressPercentage() {
        try {
            const level = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            const totalLevels = 8;
            const progressPercentage = Math.round((level / totalLevels) * 100);
            return progressPercentage;
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    async updateProgress() {
        const progressValue = await this.calculateProgressPercentage();
        const progressBar = document.querySelector('.progress-bar');
        progressBar.setAttribute('data-progress', progressValue);
        progressBar.style.cssText = `--progress-value: ${progressValue}`;
        var newStyle = `
    @keyframes progress {
        to {
            --progress-value: ${progressValue};
        }
    }
`;
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.id = 'progress-style';
        style.appendChild(document.createTextNode(newStyle));
        head.appendChild(style);

        void progressBar.offsetWidth;

        progressBar.classList.add('progress-animation');
    }

    updateRound(percentage){
        const progressElement = document.querySelector('.progress-element');
        const remainingPercentage = 100 - percentage;
        progressElement.style.setProperty('--progress-value', remainingPercentage);
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
                                                          Vous n'avez pas fait tout les tâches
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
        if (currentLevel && currentLevel.id_level === 8) {
            document.getElementById("lastLevel").innerHTML = `<div class="alert alert-warning" role="alert">
                                                      Felicitations! Vous avez debloqué niveau bonus!
                                                  </div>`;
            document.getElementById("bonus").classList.remove("disabled");
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById("lastLevel").innerHTML = "";
        } else {
            document.getElementById("lastLevel").innerHTML = "";
        }
    }

    async buttonBonusEnable() {
        let currentLevel = await this.trackerModel.getUserLevelInfo(decodeToken().id_user)
        if (currentLevel && currentLevel.id_level === 8) {
            document.getElementById("bonus").classList.remove("disabled");
            document.getElementById("nextLevel").setAttribute("disabled", "disabled");
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

    async barMenu() {
        let getUserLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
        let getLevel = await this.trackerModel.getNameLevel(getUserLevel);

        const menuItems = document.querySelectorAll('.menu__item');

        menuItems.forEach((menuItem, index) => {
            if (index === 0) {
                menuItem.setAttribute('id', 'level1');
            }

            menuItem.innerHTML = `${getLevel.name_level} ${index + 1}`;
        });
    }


     toggleDarkMode() {
         const lightSwitch = document.getElementById('lightSwitch');
         const body = document.body;
         const tables = document.querySelectorAll('table');

         function applyDarkMode() {
             document.querySelectorAll('.bg-light').forEach((element) => {
                 element.style.backgroundColor = 'rgba(57, 2, 98, 0.85)';
             });

             document.querySelectorAll('.link-dark').forEach((element) => {
                 element.classList.remove('link-dark');
                 element.classList.add('text-white');
             });

             body.style.backgroundColor = 'rgba(57, 2, 98, 0.85)';

             body.style.color = 'black';

             tables.forEach((table) => {
                 table.classList.add('table-dark');
             });

             if (!lightSwitch.checked) {
                 lightSwitch.checked = true;
             }

             localStorage.setItem('lightSwitch', 'dark');
         }

         function applyLightMode() {
             document.querySelectorAll('.bg-light').forEach((element) => {
                 element.style.backgroundColor = '';
             });

             document.querySelectorAll('.text-white').forEach((element) => {
                 element.classList.remove('text-white');
                 element.classList.add('link-dark');
             });

             body.style.backgroundColor = '';

             body.style.color = '';

             tables.forEach((table) => {
                 table.classList.remove('table-dark');
             });

             if (lightSwitch.checked) {
                 lightSwitch.checked = false;
             }

             localStorage.setItem('lightSwitch', 'light');
         }

         function onToggleMode() {
             if (lightSwitch.checked) {
                 applyDarkMode();
             } else {
                 applyLightMode();
             }
         }

         function getSystemDefaultTheme() {
             const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
             if (darkThemeMq.matches) {
                 return 'dark';
             }
             return 'light';
         }

         function setup() {
             const settings = localStorage.getItem('lightSwitch');
             if (settings === null) {
                 const defaultTheme = getSystemDefaultTheme();
                 lightSwitch.checked = defaultTheme === 'dark';
                 if (defaultTheme === 'dark') {
                     applyDarkMode();
                 } else {
                     applyLightMode();
                 }
             } else {
                 lightSwitch.checked = settings === 'dark';
                 if (settings === 'dark') {
                     applyDarkMode();
                 } else {
                     applyLightMode();
                 }
             }

             lightSwitch.addEventListener('change', onToggleMode);
         }

         setup();
     }
}

export default () => window.HomePageController = new HomePageController()
