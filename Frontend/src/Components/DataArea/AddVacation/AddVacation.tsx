import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddVacation.css";
import notificationService from "../../../Services/NotificationService";
import VacationsModel from "../../../Models/vacations-model";
import dataService from "../../../Services/DataService";
import appConfig from "../../../Utils/AppConfig";
import { authStore } from "../../../Redux/AuthState";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationsModel>();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>();
    const imageSrc = useImagePreview(imageFile);
    const [minDate, setMinDate] = useState<string>('');

    useEffect(() => {
        if (!authStore.getState().token) {
          notificationService.error("You must be logged in");
          navigate(appConfig.LoginRoute)
          return;
        }
     }, [])

    const isAdmin = true;

    function handleFileChange(event: any) {
        const files = event.target.files;
        if (!files || !files.item(0)) return;
        setImageFile(files.item(0));
    }

    async function send(vacation: VacationsModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.addVacation(vacation);
            notificationService.success("Vacation has been added");
            navigate(appConfig.VacationsRoute);
        } catch (err: any) { notificationService.error(err); }
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>
                <label>VacationDestination</label>
                <input type="text" {...register("vacationDestination")} required />

                <label>Description</label>
                <input type="text" {...register("description")} required />

                <label>CheckIn</label>
                <input type="date" {...register("checkIn", { required: true })} min={new Date().toJSON().slice(0, 10)}
                    onChange={(e) => { setMinDate(e.target.value) }} />

                <label>CheckOut</label>
                <input type="date"
                    {...register("checkOut")} min={minDate} required/>

                <label>Price</label>
                <input type="number" max="10000" step="0.01" {...register("price")} required />

                <div className="image-upload">
                    <label>Image</label>
                    <input type="file" accept="image/*" {...register("image")} onChange={handleFileChange} required />
                    <img src={imageSrc} />
                </div>
                <button>Add</button>
            </form>

        </div>
    );
}

export default AddVacation;
