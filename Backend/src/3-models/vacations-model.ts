import { UploadedFile } from "express-fileupload";
import { Validation } from "./error-models";
import Joi from "joi";

class VacationsModel {
    public vacationId: number;
    public vacationDestination: string;
    public description: string;
    public checkIn: number;
    public checkOut: number;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;

    constructor(vacation: VacationsModel) {
        this.vacationId = vacation.vacationId;
        this.vacationDestination = vacation.vacationDestination;
        this.description = vacation.description;
        this.checkIn = vacation.checkIn;
        this.checkOut = vacation.checkOut;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden(),
        vacationDestination: Joi.string().required().min(2).max(200),
        description: Joi.string().required().min(2).max(300),
        checkIn: Joi.date().required(),
        checkOut: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().required(),
        imageUrl: Joi.string().forbidden().min(50).max(200)
    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().positive(),
        vacationDestination: Joi.string().required().min(2).max(200),
        description: Joi.string().required().min(2).max(300),
        checkIn: Joi.date().required(),
        checkOut: Joi.date().required(),
        price: Joi.number().required().min(0).max(10000),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().min(50).max(200)
    });

    public postValidate(): void {
        const result = VacationsModel.postValidationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message);
        if (this.image.size > 1000000) throw new Validation("Image too large");
    }

    public putValidate(): void {
        const result = VacationsModel.putValidationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message);
        if (this.image?.size > 1000000) throw new Validation("Image too large");
    }
}


export default VacationsModel;