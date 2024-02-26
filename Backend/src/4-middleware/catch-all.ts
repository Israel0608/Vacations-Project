import { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-codes";


function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {


    console.log("Error: ", err.message);

    const status = err.status ? err.status : StatusCode.InternalServerError;

    const message = status >= 500 ? "Some error, please try again." : err.message;

    response.status(status).send(message);
}

export default catchAll;
