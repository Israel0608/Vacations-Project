import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/authService";
import notifyService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/vacations");
        }
        catch (err: any) { notifyService.error(err) }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(submit)}>

                <label>Email:</label>
                <input type="text" {...register("email")} required minLength={4} maxLength={20} autoFocus />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4} maxLength={20} />

                <div>
                    Don't have account? <Link to="/register">Register here</Link>
                </div>

                <button>Login</button>

            </form>
        </div>
    );
}

export default Login;
