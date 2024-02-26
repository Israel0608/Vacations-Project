import Joi from "joi";
import { Validation } from "./error-models";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static LoginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(4),
    });

    public LoginValidate(): void {
        const result = CredentialsModel.LoginSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message);
    }
}

export default CredentialsModel;