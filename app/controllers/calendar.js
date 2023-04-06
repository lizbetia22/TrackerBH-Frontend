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
        //
        eventsReceive.forEach(event => {

            let date = new Date(event.Date)
            // date.setMonth(-1)

            let finalDate = new Date(date.getFullYear(),date.getMonth(),date.getDate())
            events.push({Date: finalDate,Title: event.Title})
        })
        // let events = [
        //     {'Date': new Date(2023, 0, 28), 'Title': 'Doctor appointment at 3:25pm.'},
        //     {'Date': new Date(2023, 2, 28), 'Title': 'Doctor appointment at 3:25pm.'},
        //     {'Date': new Date(2023, 2, 28), 'Title': 'Doctor appointment at 3:25pm.'},
        //     {'Date': new Date(2023, 2, 28), 'Title': 'Doctor appointment at 3:25pm.'},
        //     {'Date': new Date(2016, 6, 7), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
        //     {
        //         'Date': new Date(2016, 6, 11),
        //         'Title': '25 year anniversary',
        //         'Link': 'https://www.google.com.au/#q=anniversary+gifts'
        //     },
        // ];
        let settings = {
            Color: '#999',                //(string - color) font color of whole calendar.
            LinkColor: '#333',            //(string - color) font color of event titles.
            NavShow: true,                //(bool) show navigation arrows.
            NavVertical: false,           //(bool) show previous and coming months.
            NavLocation: '#foo',          //(string - element) where to display navigation, if not in default position.
            DateTimeShow: true,           //(bool) show current date.
            DateTimeFormat: 'mmm, yyyy',  //(string - dateformat) format previously mentioned date is shown in.
            DatetimeLocation: '',         //(string - element) where to display previously mentioned date, if not in default position.
            EventClick:   function (event){
                console.log(event);
              //  console.log(event.Title);
                            },               //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
            EventTargetWholeDay: false,   //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
            DisabledDays: [],             //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
            // ModelChange: model            //(array of objects) new data object to pass into calendar (serving suggestion: passing through only the currently selected month's events if working with large dataset.
        }

        calendar.innerHTML = ``
        caleandar(calendar, events, settings)
    }



    createCalendarEvent(){
        let title = document.getElementById(`event-title`).value
        let date =  document.getElementById(`event-date`).value

        document.getElementById(`event-title`).value = ``
        document.getElementById(`event-date`).value = ``

        if (title && date) {
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
        }


        console.log(date,title)
      //
    }


}
export default () => window.CalendarController = new CalendarController()