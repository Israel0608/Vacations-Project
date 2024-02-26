import Joi from "joi";
import RolesModel from "./roles-model";
import { Validation } from "./error-models";

class UsersModel {
    public email: string;
    public firstName: string;
    public lastName: string;
    public password: number;
    public userId: number;
    public roleId: RolesModel;

    constructor(users: UsersModel) {
        this.email = users.email;
        this.firstName = users.firstName;
        this.lastName = users.lastName;
        this.password = users.password;
        this.roleId = users.roleId;
        this.userId = users.userId;
        this.roleId = users.roleId;
    }

}

export default UsersModel;