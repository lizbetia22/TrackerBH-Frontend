// Various classes not data related and not UI related

export default class TrackerAPI {
    constructor() {
        this.baseurl = 'http://localhost:3000'
    }

    loginTracker(mail_password) {
        const myHeaders= new Headers({"Content-Type": "application/json","Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(mail_password) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/auth/login`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
    createUser(dataUser) {
        const myHeaders= new Headers({"Content-Type": "application/json","Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(dataUser) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/create`, myInit)
            .then(res => {
                if (res.status === 201) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getUserInfo(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/info/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }


    updateUserInfo(data, id_user) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        console.log(myHeaders)
        const myInit= {method: 'PUT',headers: myHeaders, body : JSON.stringify(data) ,cache: 'default' }
        console.log(myInit)
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/update-user/${id_user}`, myInit)
            .then(res => {
                if (res.status === 201) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }


    getUserLevel(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders}
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getLevelName(id_level) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/get-level/${id_level}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getUserLevelInfo(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/infoLevel/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getIdTask(id_user, id_task) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/getIdTask/${id_user}/${id_task}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    allTasksOfLevel(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/tasksOfLevel/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    nameTask(id_task) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/get-task/${id_task}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    updateCheckBox(id_user, id_task) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'PUT', headers: myHeaders ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/updateCheckBox/${id_user}/${id_task}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    nextLevel(id_user) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'PUT', headers: myHeaders ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/nextLevel/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    nextTask(id_user, id_task) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'PUT', headers: myHeaders ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/nextTasks/${id_user}/${id_task}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }


    getNumberLevel(id_level) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/levels/${id_level}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getNumberTask(id_task) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/tasks/${id_task}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    updateTaskTime(id_user, id_task) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'PUT', headers: myHeaders ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/updateTimeTask/${id_user}/${id_task}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    createCalendarEvent(id_user, dataEvent) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(dataEvent) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/calendar-event/post-event/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    updateCalendarEvent(id_event_calendar, dataEvent) {
        const myHeaders= new Headers({"Content-Type": "application/json", "Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {method: 'PUT',headers: myHeaders, body : JSON.stringify(dataEvent) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/calendar-event/update-calendar-event/${id_event_calendar}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getAllUsersCalendarEvent(id_user) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/calendar-event/getAllUserEvents/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getOneUsersCalendarEvent(id_user, id_event_calendar) {
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/calendar-event/getUserEvent/${id_user}/${id_event_calendar}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    doRefreshToken(id_user){
        const myHeaders= new Headers({"Authorization":`Bearer ${sessionStorage.getItem("token")}`,"Access-Control-Allow-Origin":"*"})
        const myInit= {headers: myHeaders }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/auth/refresh/${id_user}`, myInit)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }
}

