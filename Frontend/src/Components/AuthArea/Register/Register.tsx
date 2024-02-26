import { useForm } from "react-hook-form";
import "./Register.css";
import UsersModel from "../../../Models/users-model";
import notificationService from "../../../Services/NotificationService";
import authService from "../../../Services/authService";
import appConfig from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UsersModel>();

    const navigate = useNavigate();

    async function send(user: UsersModel) {
        await authService.register(user);
        notificationService.success("You have been register successfully");
        navigate(appConfig.VacationsRoute);
        try {
            authService.register(user);
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="Register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name:</label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={100} />

                <label>Last Name:</label>
                <input type="text"  {...register("lastName")} required minLength={2} maxLength={100} />

                <label>Email:</label>
                <input type="email"  {...register("email")} required />

                <label>Password:</label>
                <input type="password"  {...register("password")} required minLength={4} maxLength={100} />

                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
