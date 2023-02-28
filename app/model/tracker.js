import TrackerAPI from "../services/apiTracker.js"
export default class trackerModel {
    constructor () {
        // data-oriented service instanciations (ex: API)
        this.api = new TrackerAPI()
    }
    async getTracker(mail_password) {
            return await this.api.loginTracker(mail_password)
    }

    async getProfile(dataUser) {
            return await this.api.createUser(dataUser)
    }

    async getLevelUserId(id_user_level) {
        try {
            return await this.api.getIdUserLevel(id_user_level)
        } catch(e) {
            Error(e)
            console.log(e)
            return undefined
        }
    }

    async getNameLevel(id_level) {
        try {
            return await this.api.getLevelName(id_level)
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getTaskUserId(id_user_task) {
        try {
            return await this.api.getIdUserTask(id_user_task)
        } catch(e) {
            Error(e)
            console.log(e)
            return undefined
        }
    }

    async getNameTask(id_level) {
        try {
            return await this.api.getTaskName(id_level)
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getUserInfo(id_user) {
        try {
            return await this.api.getUserInfo(id_user)
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async updateUser(data, id_user) {
        //return await this.api.updateUserInfo(data, id_user)
        let res = await this.api.updateUserInfo(data, id_user)
        console.log(res)
        return res;
    }

    async updateLevel(id_user) {
        try {
            return await this.api.updateUserLevel(id_user)
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async updateTask(id_user) {
        try {
            return await this.api.updateUserTask(id_user)
        } catch(e) {
            Error(e)
            return undefined
        }
    }

}