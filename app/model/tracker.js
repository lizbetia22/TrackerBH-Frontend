import TrackerAPI from "../services/apiTracker.js"
export default class trackerModel {
    constructor () {
        this.api = new TrackerAPI()
    }
    async getLogin(mail_password) {
            let login = await this.api.loginTracker(mail_password)
            return login
    }

    async createProfile(dataUser) {
            let newProfile = await this.api.createUser(dataUser)
            return newProfile
    }

    async updateUser(data, id_user) {
        let updatedUser = await this.api.updateUserInfo(data, id_user)
        return updatedUser;
    }


    async getUserInfo(id_user) {
        try {
            let userInfo = await this.api.getUserInfo(id_user)
            return userInfo
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getLevelUserById(id_user) {
        try {
            let userLevelId = await this.api.getUserLevel(id_user)
            return userLevelId
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getNameLevel(id_level) {
        try {
            let nameLevel = await this.api.getLevelName(id_level)
            return nameLevel
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getUserLevelInfo(id_user) {
        try {
            let userLevel = await this.api.getUserLevelInfo(id_user)
            return userLevel
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getIdTaskByUser(id_user, id_task) {
        try {
            let task = await this.api.getIdTask(id_user, id_task)
            return task
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getAllTasksOfLevel (id_user) {
        try {
            let nextTask = await this.api.allTasksOfLevel(id_user)
            return nextTask
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getNameTasks (id_task) {
        try {
            let nextTask = await this.api.nameTask(id_task)
            return nextTask
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async updateCheckBox(id_user, id_task) {
        try {
            let updateCheckBox = await this.api.updateCheckBox(id_user, id_task)
            return updateCheckBox
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async setNextLevel (id_user) {
        try {
            let nextLevel = await this.api.nextLevel(id_user)
            return nextLevel
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async setNextTasks (id_user, id_task) {
        try {
            let nextTask = await this.api.nextTask(id_user, id_task)
            return nextTask
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getLevelNumber (id_level) {
        try {
            let levelnumber = await this.api.getNumberLevel(id_level)
            return levelnumber
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getNumberTask (id_task) {
        try {
            let tasknumber = await this.api.nextTask(id_task)
            return tasknumber
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async updateTaskTime (id_user, id_task) {
        try {
            let taskTime = await this.api.updateTaskTime(id_user, id_task)
            return taskTime
        } catch(e) {
            Error(e)
            return undefined
        }
    }
}