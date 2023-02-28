// Various classes not data related and not UI related

export default class TrackerAPI {
    constructor() {
        this.baseurl = 'http://localhost:3000'
    }

    loginTracker(mail_password) {
        const myHeaders= new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(mail_password) ,cache: 'default' }

        console.log(myInit)
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
        const myHeaders= new Headers({"Content-Type": "application/json"})
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

    getIdUserLevel(id_user_level) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/${id_user_level}`)
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
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/get-level/${id_level}`)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getIdUserTask(id_user_task) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/${id_user_task}`)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getTaskName(id_level) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/tasks/level/${id_level}`)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    getUserInfo(id_user) {
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/users/info/${id_user}`)
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
        const myHeaders= new Headers({"Content-Type": "application/json"})
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

    updateUserLevel(id_user) {
        const myHeaders= new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(id_user) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-level/updateLevel/${id_user}`, myInit)
            .then(res => {
                if (res.status === 201) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

    updateUserTask(id_user) {
        const myHeaders= new Headers({"Content-Type": "application/json"})
        const myInit= {method: 'POST',headers: myHeaders, body : JSON.stringify(id_user) ,cache: 'default' }
        return new Promise((resolve, reject) => fetch(`${this.baseurl}/user-task/updateTask/${id_user}`, myInit)
            .then(res => {
                if (res.status === 201) {
                    resolve()
                } else {
                    reject(res.status)
                }
            })
            .catch(err => reject(err)))
    }

}