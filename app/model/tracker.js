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
            return e
        }
    }

    async getLevelUserById(id_user) {
        try {
            let userLevelId = await this.api.getUserLevel(id_user)
            return userLevelId
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getNameLevel(id_level) {
        try {
            let nameLevel = await this.api.getLevelName(id_level)
            return nameLevel
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getUserLevelInfo(id_user) {
        try {
            let userLevel = await this.api.getUserLevelInfo(id_user)
            return userLevel
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getIdTaskByUser(id_user, id_task) {
        try {
            let task = await this.api.getIdTask(id_user, id_task)
            return task
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getAllTasksOfLevel (id_user) {
        try {
            let nextTask = await this.api.allTasksOfLevel(id_user)
            return nextTask
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getNameTasks (id_task) {
        try {
            let nextTask = await this.api.nameTask(id_task)
            return nextTask
        } catch(e) {
            Error(e)
            return e
        }
    }

    async updateCheckBox(id_user, id_task) {
        try {
            let updateCheckBox = await this.api.updateCheckBox(id_user, id_task)
            return updateCheckBox
        } catch(e) {
            Error(e)
            return e
        }
    }

    async setNextLevel (id_user) {
        try {
            let nextLevel = await this.api.nextLevel(id_user)
            return nextLevel
        } catch(e) {
            Error(e)
            return e
        }
    }

    async setNextTasks (id_user, id_task) {
        try {
            let nextTask = await this.api.nextTask(id_user, id_task)
            return nextTask
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getLevelNumber (id_level) {
        try {
            let levelnumber = await this.api.getNumberLevel(id_level)
            return levelnumber
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getNumberTask (id_task) {
        try {
            let tasknumber = await this.api.nextTask(id_task)
            return tasknumber
        } catch(e) {
            Error(e)
            return e
        }
    }

    async updateTaskTime (id_user, id_task) {
        try {
            let taskTime = await this.api.updateTaskTime(id_user, id_task)
            return taskTime
        } catch(e) {
            Error(e)
            return e
        }
    }

    async createUserCalendarEvent (id_user, dataEvent) {
        try {
            let newEvent = await this.api.createCalendarEvent(id_user, dataEvent)
            return newEvent
        } catch(e) {
            Error(e)
            return e
        }
    }

    async updateUserCalendarEvent (id_event_calendar, dataEvent) {
        try {
            let updatedEvent = await this.api.updateCalendarEvent(id_event_calendar, dataEvent)
            return updatedEvent
        } catch(e) {
            Error(e)
            return e
        }
    }

    async deleteEvent (id_event_calendar) {
        try {
            let deletedEvent = await this.api.deleteCalendarEvent(id_event_calendar)
            return deletedEvent
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getAllUserCalendarEvent (id_user) {
        try {
            let usersEvents = await this.api.getAllUsersCalendarEvent(id_user)
            return usersEvents
        } catch(e) {
            Error(e)
            return e
        }
    }

    async getOneUserCalendarEvent (id_user, id_event_calendar) {
        try {
            let userEvent = await this.api.getOneUsersCalendarEvent(id_user, id_event_calendar)
            return userEvent
        } catch(e) {
            Error(e)
            return e
        }
    }

    async refreshToken (id_user) {
        try {
            return await this.api.doRefreshToken(id_user)
        } catch(e) {
            Error(e)
            return e
        }
    }
}