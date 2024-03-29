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
        this.alertLogin();
    }

    alertLogin(){
        alert = document.getElementById('loginAlert')
        if (localStorage.getItem('login')) {
            localStorage.removeItem('login')
            alert.innerHTML = `<div class="alert my-alert-sucess" role="alert">
                Vous avez connecte avec succès
            </div>`;
            this.setTimeoutAlert('loginAlert', 2000);
        }

    }


    async setNickname() {
        this.isTokenValid()
        try {
            let user_info = await this.trackerModel.getUserInfo(decodeToken().id_user);
            document.getElementById('nickname').innerHTML = `${user_info.nickname}, ${user_info.age}`;
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
             Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Get user info error ', error);
        }
    }


    async userLevelName() {
        this.isTokenValid()
        try {
            let getUserLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            let getLevel = await this.trackerModel.getNameLevel(getUserLevel);
            document.getElementById(`titleWeek`).innerHTML = `${getLevel.name_level}`;
            document.getElementById(`numberOflevel`).innerHTML = `<h4 style="text-align: center">Niveau - ${getLevel.id_level}</h4>`;
            let progressPercentage = await this.calculateProgressPercentage();
            await this.updateProgress(progressPercentage);
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
             Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Get user level name error ', error);

        }
    }

    async calculateProgressPercentage() {
        this.isTokenValid()
        try {
            const level = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            const totalLevels = 8;
            const progressPercentage = Math.round((level / totalLevels) * 100);
            return progressPercentage;
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
              Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.log('Calculating progress error ' + error);
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

    async userTaskName() {
        this.isTokenValid()
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
        } catch (error) {
                  document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
              Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.log('Get user name task error' + error)
        }
        card.innerHTML = content
        await this.checkedCheckBoxTrue();
    }

    async checkedCheckbox(index) {
        this.isTokenValid()
       try {
            await this.trackerModel.getUserInfo(decodeToken().id_user)
            const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            const id_task = index + 7 * (userLevel - 1);

            if (id_task === 1 || id_task % 7 === 1) {
                await this.trackerModel.updateTaskTime(decodeToken().id_user, id_task);
                await this.trackerModel.updateCheckBox(decodeToken().id_user, id_task);
            } else {
                const dateTaskEnd = (await this.trackerModel.getIdTaskByUser(decodeToken().id_user, id_task - 1)).task_date_end;
                let date = new Date();
                date.setHours(date.getHours() + 1);
                date.setMinutes(date.getMinutes() - 1);
                let isoString = date.toISOString();

                if (isoString > dateTaskEnd) {
                    await this.trackerModel.updateTaskTime(decodeToken().id_user, id_task);
                    await this.trackerModel.updateCheckBox(decodeToken().id_user, id_task);
                } else {
                    document.getElementById("alertLevel").innerHTML = `<div class="alert my-alert-danger" role="alert">
                                                  Vous avez passé moins  d'1 minute sur la tâche
                                                </div>`;
                    document.getElementById("alertLevel").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("alertLevel").style.display = "none";
                    }, 1500);

                    let checkbox = document.getElementById(`checkbox-${index}`);
                    checkbox.checked = false;
                }
            }
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
              Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Error occurred while checking the checkbox ', error);
        }
    }


    async checkedCheckBoxTrue() {
        this.isTokenValid()
        try {
            const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            for (let i = 1; i < 8; i++) {
                const id_task = i + 7 * (userLevel - 1);
                const getIdTask = (await this.trackerModel.getIdTaskByUser(decodeToken().id_user, id_task)).checkBox;
                if (getIdTask) {
                    let idCheckbox = `checkbox-${i}`;
                    document.getElementById(idCheckbox).checked = true;
                }
            }
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
              Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Error occurred while setting checked checkboxes ', error);
        }
    }

    async nextLevel() {
        this.isTokenValid()
        try {
            await this.trackerModel.getUserInfo(decodeToken().id_user)
            const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            if (userLevel === 8) {
                return;
            }

            let allChecked = true;
            for (let i = 1; i < 8; i++) {
                const id_task = i + 7 * (userLevel - 1);
                const getIdTask = (await this.trackerModel.getIdTaskByUser(decodeToken().id_user, id_task)).checkBox;

                if (!getIdTask) {
                    allChecked = false;
                }
            }

            if (allChecked) {
                await this.trackerModel.setNextLevel(decodeToken().id_user);
                this.userLevelName();

                for (let i = 1; i < 8; i++) {
                    const id_task = i + 7 * (userLevel - 1);
                    await this.trackerModel.setNextTasks(decodeToken().id_user, id_task);
                }

                this.userTaskName();
                this.lastLevelAlert();
                this.isLevelCompleted();

                if(userLevel !==8 ){
                    document.getElementById("alertLevel").innerHTML = `<div class="alert my-alert-sucess" role="alert">
        Vous avez passé au niveau suivant
      </div>`;
                    this.setTimeoutAlert('alertLevel', 2000);
                }

            } else {
                document.getElementById("alertLevel").innerHTML = `<div class="alert my-alert-danger" role="alert">
                Vous n'avez pas fait toutes les tâches
            </div>`;
                document.getElementById("alertLevel").style.display = "block";

                setTimeout(() => {
                    document.getElementById("alertLevel").style.display = "none";
                }, 1000);
            }
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
             Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.log('An error occurred during setting next level:', error);
        }
    }


    async lastLevelAlert() {
        try {
            let currentLevel = await this.trackerModel.getUserLevelInfo(decodeToken().id_user)
            if (currentLevel && currentLevel.id_level === 8) {
                document.getElementById("lastLevel").innerHTML = `<div class="alert my-alert-sucess" role="alert">
                                                      Felicitations! Vous avez debloqué niveau bonus!
                                                  </div>`;
                document.getElementById("bonus").classList.remove("disabled");
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById("lastLevel").innerHTML = "";
            } else {
                document.getElementById("lastLevel").innerHTML = "";
            }
        }catch (e) {
                  document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
                     Une erreur est survenue
            </div>`;
                  this.setTimeoutAlert('catchError', 1500);
            console.log(`Error of setting last level alert`)
        }
    }

    async buttonBonusEnable() {
        try {
            let bonus = document.getElementById("bonus");
            let currentLevel = await this.trackerModel.getUserLevelInfo(decodeToken().id_user);
            if (currentLevel && currentLevel.id_level === 8) {
                bonus.classList.remove("disabled");
                document.getElementById("nextLevel").setAttribute("disabled", "disabled");
            }
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
               Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Error occurred while enabling the bonus button', error);
        }
    }

    async buttonPageBonus() {
        try {
            let currentLevel = await this.trackerModel.getUserLevelInfo(decodeToken().id_user);
            if (currentLevel && currentLevel.id_level === 8) {
                navigate('bonus');
            }
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
              Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Error occurred while navigating to the bonus page:', error);
        }
    }


    async isLevelCompleted() {
        try {
            const userLevel = (await this.trackerModel.getLevelUserById(decodeToken().id_user)).id_level;
            const allLevels = await this.trackerModel.getAllLevels();

            const menuItems = document.querySelectorAll('.menu__item');
            menuItems.forEach((menuItem, index) => {
                const levelNumber = index + 1;

                if (levelNumber <= userLevel) {
                    menuItem.removeAttribute('disabled');
                } else {
                    menuItem.setAttribute('disabled', true);
                }

                const menuItemName = menuItem.textContent;
                const matchingLevel = allLevels.find(level => level.name_level === menuItemName);

                if (matchingLevel && matchingLevel.id_level <= userLevel) {
                    menuItem.removeAttribute('disabled');
                } else {
                    menuItem.setAttribute('disabled', true);
                }
            });
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
              Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('Error occurred while checking if the 8 level is completed', error);
        }
    }


    async barMenu() {
        try {
            let allLevels = await this.trackerModel.getAllLevels();
            const menuBox = document.querySelector('.menu__box');
            allLevels.forEach((level) => {
                const menuItem = document.createElement('li');
                const menuLink = document.createElement('a');
                menuLink.classList.add('menu__item');
                menuLink.textContent = level.name_level;
                menuItem.appendChild(menuLink);
                menuBox.appendChild(menuItem);
            });

            const logoItem = document.createElement('li');
            const logoLink = document.createElement('a');
            const logoImg = document.createElement('img');
            logoLink.classList.add('img__item');
            logoImg.src = 'https://www.hebergeur-image.com/upload/86.221.48.88-6478824be637e.png';
            logoImg.height = '60';
            logoImg.width = '60';
            logoImg.classList.add('logo');
            logoLink.appendChild(logoImg);
            logoItem.appendChild(logoLink);
            menuBox.appendChild(logoItem);
        } catch (error) {
            document.getElementById('catchError').innerHTML = `<div class="alert my-alert-danger" role="alert">
               Une erreur est survenue
      </div>`;
            this.setTimeoutAlert('catchError', 1500);
            console.error('An error occurred while setting the menu bar', error);
        }
    }

}

export default () => window.HomePageController = new HomePageController()
