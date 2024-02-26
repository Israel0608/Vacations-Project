import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import notificationService from "../../../Services/NotificationService";
import dataService from "../../../Services/DataService";
import VacationsModel from "../../../Models/vacations-model";
import moment from "moment";

function EditVacation(): JSX.Element {
    const { register, handleSubmit, setValue } = useForm<VacationsModel>();

    const params = useParams();
    const id = +params.vacationId;

    const navigate = useNavigate();

    useEffect(() => {
        dataService.getVacationById(id)
            .then(vacation => {
                setValue("vacationDestination", vacation.vacationDestination);
                setValue("description", vacation.description);
                setValue("checkIn", vacation.checkIn);
                setValue("checkOut", vacation.checkOut);
                setValue("price", vacation.price);
                setValue("imageUrl", vacation.imageUrl);
            })
            .catch(err => notificationService.error(err))
    }, []);

    function cancelUpdate() {
        navigate("/vacations");
    }

    async function update(vacation: VacationsModel) {
        try {
            if (moment(vacation.checkIn).isAfter(moment(vacation.checkOut))) {
                notificationService.error("Check-in cannot be later than check-out");
                return;
            }
            vacation.vacationId = id;

            vacation.image = (vacation.image as unknown as FileList)[0];

            await dataService.updateVacation(vacation);

            notificationService.success("Vacation has been updated");

            navigate("/vacations");
        } catch (err: any) {
            notificationService.error(err);
        }

    }
    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(update)}>
                <label>VacationDestination</label>
                <input type="text" {...register("vacationDestination")} min={2} max={200} />

                <label>Description</label>
                <input type="text" {...register("description")} min={2} max={200} />

                <label>CheckIn</label>
                <input type="date" {...register("checkIn")} />

                <label>CheckOut</label>
                <input type="date" {...register("checkOut")} />

                <label>Price</label>
                <input type="number" step="0.01" {...register("price")} max={10000} min={1}/>

                <label>Image</label>
                <input type="file" accept="imag/*" {...register("image")} />

                <button>Update</button>

                <button type="button" onClick={cancelUpdate}>Cancel</button>
            </form>
        </div>
    );
}

export default EditVacation;