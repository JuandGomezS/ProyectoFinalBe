import { UserRepo } from "../persistence/repos/user.repo.js"

const persistenceModel = new UserRepo()

export class UserService {

    constructor() {
        this.persistence = persistenceModel
    }

    getUser = async (username) => {
        return await this.persistence.getUser(username)
    }

    loginUser = async (username, password, done) => {
        return await this.persistence.loginUser(username, password, done);
    }

    signupUser = async (req, username, password, done) => {
        return await this.persistence.signupUser(username, password, req, done);
    }

    serializeUser = (username, done) => {
        return this.persistence.serializeUser(username, done);
    }

    deserializeUser = async (user, done) => {
        return await this.persistence.deserializeUser(user, done)
    }

}