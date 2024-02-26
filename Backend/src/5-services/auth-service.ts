import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import UsersModel from "../3-models/users-model";
import RolesModel from "../3-models/roles-model";
import cyber from "../2-utils/cyber";
import { Unauthorized, Validation } from "../3-models/error-models";
import CredentialsModel from "../3-models/credential-model";

class AuthService {

    public async register(user: UsersModel): Promise<string> {
        user.roleId = RolesModel.user;
        const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)";
        const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);
        user.userId = info.insertId;

        const token = cyber.getNewToken(user);
        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {
        credentials.LoginValidate()
        const sql = `SELECT * FROM users WHERE
                        email = '${credentials.email}' AND
                        password = '${credentials.password}'`;

        const users = await dal.execute(sql);
        const user = users[0];
        if (!user) throw new Unauthorized("Incorrect email or password");
        const token = cyber.getNewToken(user);
        return token;
    }

}

const authService = new AuthService();

export default authService;