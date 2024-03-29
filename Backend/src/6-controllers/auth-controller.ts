import express, { Request, Response, NextFunction } from "express";
import UsersModel from "../3-models/users-model";
import CredentialsModel from "../3-models/credential-model";
import authService from "../5-services/auth-service";

const router = express.Router();

router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UsersModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    } catch (err: any) { next(err) }
})


router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    } catch (err: any) { next(err) }
})

export default router;