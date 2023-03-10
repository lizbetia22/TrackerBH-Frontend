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

    async getLevelUserId(id_user_level) {
        try {
            let userLevelId = await this.api.getIdUserLevel(id_user_level)
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

    async getTaskUserId(id_user_task) {
        try {
            let taskUserId = await this.api.getIdUserTask(id_user_task)
            return taskUserId
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getNameTask(id_level) {
        try {
            let taskName = await this.api.getTaskName(id_level)
            return taskName
        } catch(e) {
            Error(e)
            return undefined
        }
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

    async getUserLevelInfo(id_user) {
        try {
            let userLevel = await this.api.getUserLevelInfo(id_user)
            return userLevel
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async updateUser(data, id_user) {
        let updatedUser = await this.api.updateUserInfo(data, id_user)
        return updatedUser;
    }

    async updateLevel(id_user) {
        try {
        let updatedLevel = await this.api.updateUserLevel(id_user)
            return updatedLevel;
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async updateTask(id_user) {
        try {
            let updatedTask = await this.api.updateUserTask(id_user)
            return updatedTask
        } catch(e) {
            Error(e)
            return undefined
        }
    }

    async getIdTask(id_user, id_task) {
        try {
            let task = await this.api.getIdTask(id_user, id_task)
            return task
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

    async getTasksOfLevel (id_user) {
        try {
            let nextTask = await this.api.tasksOfLevel(id_user)
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
}