import BaseController from "./basecontroller.js";
import trackerModel from "../model/tracker.js";

class HomePageController extends BaseController {
    constructor() {
        super()
        this.trackerModel = new trackerModel()
        this.userLevelName();
        this.setNickname();
        this.userLevelTask();
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

    async userLevelTask() {
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
                                    <input type="checkbox" id="check" class="check">
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

    nextLevel(){
        let numberOfCheckboxChecked = 0;
        document.querySelectorAll('.check').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    numberOfCheckboxChecked++;
                } else {
                    numberOfCheckboxChecked--;
                }
            });
        });

        document.querySelector('.nextLevel').addEventListener('click', async () => {
            const totalNumberOfCheckBox = document.querySelectorAll('.check').length;

            const numberOfChecked = document.querySelectorAll('.check:checked').length;
            if (numberOfChecked === totalNumberOfCheckBox) {
                const userLevel = await this.trackerModel.getLevelUserId(decodeToken().id_user);
               // const newLevel = userLevel.id_level + 1;
                await this.trackerModel.updateLevel(decodeToken().id_user); //newLevel);
                await this.trackerModel.updateTask(decodeToken().id_user);
                console.log('Next level unlocked!');
            } else {
                console.log('Please complete all tasks before unlocking the next level.');
            }
        });

    }



    //AIzaSyDrR0um2oFxgbiSNdgCbir4cG08LvzhHMM
    //AIzaSyDrR0um2oFxgbiSNdgCbir4cG08LvzhHMM

    // select the button element
  //  const button = document.querySelector('#get-events');

// add an event listener to the button for click event
//     button.addEventListener('click', () => {
//     // make an API request to retrieve events
//     fetch('/api/calendar/events')
// .then(response => response.json())
// .then(data => {
//     // display the events in the front-end
//     const eventList = document.querySelector('#event-list');
//     eventList.innerHTML = '';
//     data.forEach(event => {
//     const eventItem = document.createElement('li');
//     eventItem.innerText = `${event.start.dateTime} - ${event.summary}`;
//     eventList.appendChild(eventItem);
// });
// })
// .catch(error => console.error(error));
// });


// <ul id="event-list"></ul>
// <button id="get-events" onClick="getCalendarEvents()">Get Events</button>
// <script>
// function getCalendarEvents() {
//     fetch('/api/calendar/events').then(response => response.json())
// .then(data => { const eventList = document.querySelector('#event-list');
//     eventList.innerHTML = '';
//     data.forEach(event => { const eventItem = document.createElement('li');
//     eventItem.innerText = `${event.start.dateTime} - ${event.summary}`;
//     eventList.appendChild(eventItem);
// }
// )
// ;
// })
// .catch(error => console.error(error));
// }
// </script>
}

export default () => window.HomePageController = new HomePageController()
