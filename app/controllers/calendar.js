import trackerModel from "../model/tracker.js";
import BaseController from "./basecontroller.js";

class CalendarController extends BaseController {
    constructor() {
        super()
      this.trackerModel = new trackerModel()
        this.initCalendar()
    }


    async initCalendar() {
        let calendar = document.getElementById('caleandar')
        let eventsReceive = await this.trackerModel.getAllUserCalendarEvent(decodeToken().id_user)
        let events = []
        console.log(eventsReceive)
        //
        eventsReceive.forEach(event => {

            let date = new Date(event.Date)

            let finalDate = new Date(date.getFullYear(),date.getMonth(),date.getDate())
            events.push({Date: finalDate,Title: event.Title, Link: event.Link});
        })

        let settings = {
            Color: '#999',                //(string - color) font color of whole calendar.
            LinkColor: '#333',            //(string - color) font color of event titles.
            NavShow: true,                //(bool) show navigation arrows.
            NavVertical: false,           //(bool) show previous and coming months.
            NavLocation: '#foo',          //(string - element) where to display navigation, if not in default position.
            DateTimeShow: true,           //(bool) show current date.
            DateTimeFormat: 'mmm, yyyy',  //(string - dateformat) format previously mentioned date is shown in.
            DatetimeLocation: '',         //(string - element) where to display previously mentioned date, if not in default position.
            EventClick:   async function (event) {
                console.log(event)
                let id_event = event
                const modal = document.getElementById('exampleModal2');
                document.getElementById('modal-update-footer').innerHTML = `<button type="button" class="btn navBar info" onclick="CalendarController.updateEventCalendar(${id_event})">
                                                                                      Modifier
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-danger" onclick="CalendarController.alertConfirmDelete(${id_event})">
                                                                                      Supprimer
                                                                                    </button>`
                let modalInstance = new bootstrap.Modal(modal);
                modalInstance.show()
                 await this.getInputValue(id_event);
                //deleteCalendarEvent

            }.bind(this),
            //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
            EventTargetWholeDay: false,   //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
            DisabledDays: [],             //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
            // ModelChange: model            //(array of objects) new data object to pass into calendar (serving suggestion: passing through only the currently selected month's events if working with large dataset.
        }

        calendar.innerHTML = ``
        caleandar(calendar, events, settings)
    }

    validationCalendar(){
        let title = document.getElementById(`event-title`)
        let date =  document.getElementById(`event-date`)
        let validTitle = document.getElementById(`validTitle`)
        let validDate = document.getElementById(`validDate`)

        let valid = true;
        if (title.value.length === 0) {
            title.classList.remove('is-valid')
            title.classList.add('is-invalid')
            validTitle.innerHTML = `<h5 style="color: red; font-size: 12px">La valeur est vide<h5/>`
            valid = false
        } else {
            title.classList.remove('is-invalid')
            title.classList.add('is-valid')
            validTitle.innerHTML = ``
        }
        if (date.value.length === 0) {
            date.classList.remove('is-valid')
            date.classList.add('is-invalid')
            validDate.innerHTML = `<h5 style="color: red; font-size: 12px">La valeur est vide<h5/>`
            valid = false
        } else {
            date.classList.remove('is-invalid')
            date.classList.add('is-valid')
            validDate.innerHTML = ``
        }
        return valid
    }

    validationUpdateEvent(){
        let title = document.getElementById(`update-title`)
        let date =  document.getElementById(`update-date`)
        let validTitle = document.getElementById(`validTitles`)
        let validDate = document.getElementById(`validDates`)

        let valid = true;
        if (title.value.length === 0) {
            title.classList.remove('is-valid')
            title.classList.add('is-invalid')
            validTitle.innerHTML = `<h5 style="color: red; font-size: 12px">La valeur est vide<h5/>`
            valid = false
        } else {
            title.classList.remove('is-invalid')
            title.classList.add('is-valid')
            validTitle.innerHTML = ``
        }
        if (date.value.length === 0) {
            date.classList.remove('is-valid')
            date.classList.add('is-invalid')
            validDate.innerHTML = `<h5 style="color: red; font-size: 12px">La valeur est vide<h5/>`
            valid = false
        } else {
            date.classList.remove('is-invalid')
            date.classList.add('is-valid')
            validDate.innerHTML = ``
        }
        return valid
    }


    createCalendarEvent(){
        let title = document.getElementById(`event-title`).value
        let date =  document.getElementById(`event-date`).value
        let alert = document.getElementById('addedEvent')

        let boolean =  this.validationCalendar()
        if (boolean === true) {
            document.getElementById(`event-date`).classList.remove('is-valid');
            document.getElementById(`event-title`).classList.remove('is-valid');
            document.getElementById(`event-date`).classList.remove('is-invalid');
            document.getElementById(`event-title`).classList.remove('is-invalid');
            let datefinal = new Date(date)
            let data = {title_event:title, date_event: datefinal}
            this.trackerModel.createUserCalendarEvent(decodeToken().id_user, data)
            this.initCalendar()

            let modal = document.getElementById('exampleModal1');
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            let modalBackdrop = document.querySelector('.modal-backdrop');
            modalBackdrop.parentNode.removeChild(modalBackdrop);

            alert.innerHTML = `<div class="alert alert-primary" role="alert">
  Votre evenement été ajouté avec success
</div>`
            this.setTimeoutAlert('addedEvent', 1500);

        }

        document.getElementById(`event-title`).value = ``
        document.getElementById(`event-date`).value = ``

    }
    async updateEventCalendar(event) {
        try {
            console.log(event);

            let alert = document.getElementById('updateEventAlert');
            let title = document.getElementById(`update-title`);
            let date = document.getElementById(`update-date`);

            const data = {
                "date_event": date.value,
                "title_event": title.value
            };

            let boolean = this.validationUpdateEvent();
            if (boolean === true) {
                document.getElementById(`update-date`).classList.remove('is-valid');
                document.getElementById(`update-title`).classList.remove('is-valid');
                document.getElementById(`event-date`).classList.remove('is-valid');
                document.getElementById(`event-title`).classList.remove('is-valid');
                document.getElementById(`event-date`).classList.remove('is-invalid');
                document.getElementById(`event-title`).classList.remove('is-invalid');
                await this.trackerModel.updateUserCalendarEvent(event, data);
                this.initCalendar();

                let modal = document.getElementById('exampleModal2');
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                let modalBackdrop = document.querySelector('.modal-backdrop');
                modalBackdrop.parentNode.removeChild(modalBackdrop);

                alert.innerHTML = `<div class="alert alert-primary" role="alert">
                Votre evenement a été modifié avec succès
            </div>`;
                this.setTimeoutAlert('updateEventAlert', 1500);
                title.value = ``
                date.value = ``
            }
        } catch (error) {
            alert.innerHTML = `<div class="alert alert-danger" role="alert">
                Une erreur est survenue 
            </div>`;
            this.setTimeoutAlert('updateEventAlert', 1500);
            console.error(error);
        }
    }

    async getInputValue(event){
        const calendarInfo = await this.trackerModel.getOneUserCalendarEvent(decodeToken().id_user, event)
        let title = document.getElementById(`update-title`);
        let date = document.getElementById(`update-date`);
        title.value = calendarInfo.title_event

        let dates = calendarInfo.date_event
        const formattedDates = new Date(dates).toISOString().split('T')[0];

        date.value = formattedDates
    }

    async deleteCalendarEvent(event){
        const calendarInfo = await this.trackerModel.deleteEvent(event)
        const alert = document.getElementById('deleteEvent')

        if(calendarInfo){
            this.initCalendar()

            let modal = document.getElementById('exampleModal2');
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            let modalBackdrop = document.querySelector('.modal-backdrop');
            modalBackdrop.parentNode.removeChild(modalBackdrop);

            alert.innerHTML = `<div class="alert alert-primary" role="alert">
                Votre evenement a été supprimé avec succès
            </div>`;
            this.setTimeoutAlert('deleteEvent', 1500);
        }
    }


    alertConfirmDelete(event) {
        const customAlert = document.getElementById('custom-alert');
        const confirmButton = document.querySelector('#custom-alert .btn-confirm');
        const cancelButton = document.querySelector('#custom-alert .btn-cancel');

        customAlert.style.pointerEvents = 'auto'; // Enable pointer events on the alert

        confirmButton.addEventListener('click', () => {
            this.deleteCalendarEvent(event);
            customAlert.style.display = 'none'; // Hide the custom alert
        });

        cancelButton.addEventListener('click', () => {
            customAlert.style.display = 'none'; // Hide the custom alert
        });

        customAlert.style.display = 'flex'; // Show the custom alert
    }




}
export default () => window.CalendarController = new CalendarController()