import express, { NextFunction, Request, Response } from "express";
import dataService from "../5-services/data-service";
import VacationModel from "../3-models/vacations-model";
import StatusCode from "../3-models/status-codes";
import verifyToken from "../4-middleware/varify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import { fileSaver } from "uploaded-file-saver";

const router = express.Router();

router.get("/vacations/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacations = await dataService.getAllVacationsByUser(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/vacationById/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = parseInt(request.params.vacationId);
        const vacation = await dataService.getVacationById(vacationId);
        response.status(StatusCode.OK).json(vacation);
    } catch (err: any) { next(err) }
});

router.post("/add-vacation", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await dataService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/deleteVacation/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        await dataService.deleteVacation(vacationId)
        response.sendStatus(StatusCode.NoContent)
    }
    catch (err: any) { next(err); }
});

router.put("/update/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await dataService.updateVacation(vacation);
        response.status(StatusCode.OK).json(updatedVacation);
    }
    catch (err: any) { next(err) }
});

router.get("/followers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await dataService.getAllFollowers();
        response.json(followers);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/followers/:userId/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId
        const vacationId = request.params.vacationId;
        await dataService.followe(userId, vacationId)
        response.json(StatusCode.NoContent).json();
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/followers/:userId/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId
        const vacationId = request.params.vacationId;
        await dataService.unfollowVacation(userId, vacationId)
        response.json(StatusCode.NoContent).json();
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/vacations-image/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;