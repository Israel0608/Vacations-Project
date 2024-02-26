import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationsModel from "../3-models/vacations-model";
import FollowersModel from "../3-models/followers-model";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import UsersModel from "../3-models/users-model";

class VacationService {

    public async getAllVacationsByUser(userId: number): Promise<VacationsModel[]> {
        const sql = `
    SELECT DISTINCT
    V.*,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount,
    CONCAT('${appConfig.appHost}', '/api/vacations-image/', ImageName) AS imageUrl
    FROM vacations as V LEFT JOIN followers as F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY checkIn`;
        const vacations = await dal.execute(sql, [userId]);
        return vacations;
    }

    public async getVacationById(vacationId: number): Promise<VacationsModel> {
        const sql = `SELECT 
        vacationId,
        vacationDestination,
        description,
        DATE_FORMAT(checkIn, "%Y-%m-%d") AS checkIn,
        DATE_FORMAT(checkOut, "%Y-%m-%d") AS checkOut,
        price 
        FROM vacations WHERE vacationId = ?`;
        const vacation = await dal.execute(sql, [vacationId]);
        return vacation[0];
    }


    public async addVacation(vacation: VacationsModel): Promise<VacationsModel> {
        vacation.postValidate();
        const imageName = await fileSaver.add(vacation.image);
        const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`
        const info: OkPacket = await dal.execute(sql, [
            vacation.vacationDestination,
            vacation.description,
            vacation.checkIn,
            vacation.checkOut,
            vacation.price,
            imageName]);
        vacation.vacationId = info.insertId;
        delete vacation.image
        vacation.imageUrl = appConfig.appHost + "/api/vacations-image/" + imageName;
        return vacation;
    }

    private async getExistingImageName(vacationId: number): Promise<string> {
        const sql = `SELECT ImageName FROM vacations WHERE vacationId = ${vacationId}`;
        const vacations = await dal.execute(sql);
        const vacation = vacations[0];
        if (!vacation) return "";
        return vacation.ImageName;
    }


    public async updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
        vacation.putValidate();
        const existingImageName = await this.getExistingImageName(vacation.vacationId);
        const imageName = vacation.image ? await fileSaver.update(existingImageName, vacation.image) : existingImageName;
        const sql = "UPDATE vacations SET vacationDestination=?, description=?, checkIn=?, checkOut=?, price=?, imageName=? WHERE vacationId=?";
        await dal.execute(sql, [vacation.vacationDestination, vacation.description, vacation.checkIn, vacation.checkOut, vacation.price, imageName, vacation.vacationId]);
        vacation.imageUrl = appConfig.appHost + "/api/vacations-image/" + imageName;
        return vacation;
    }


    public async deleteVacation(vacationId: number): Promise<void> {
        const sql = `DELETE FROM vacations WHERE vacationId = ?`;
        await dal.execute(sql, [vacationId])
    }


    public async getAllFollowers(): Promise<FollowersModel[]> {
        const sql = "SELECT * FROM followers";
        const followers = dal.execute(sql);
        return followers;
    }

    public async followe(userId: string, vacationId: string): Promise<void> {
        const sql = "INSERT INTO followers VALUES(?, ?)";
        await dal.execute(sql, [userId, vacationId]);
    }


    public async unfollowVacation(userId: string, vacationId: string): Promise<void> {
        const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
        await dal.execute(sql, [userId, vacationId]);
    }
}

const vacationService = new VacationService();

export default vacationService;