import "./DeleteVacation.css";
import dataService from "../../../Services/DataService";
import notificationService from "../../../Services/NotificationService";
import VacationsModel from "../../../Models/vacations-model";

function DeleteVacation(vacation: VacationsModel): JSX.Element {

    async function deleteVacation() {
        try {
            const ok = window.confirm('Are you sure?');
            if (!ok) return;

            await dataService.deleteVacation(vacation.vacationId);
            notificationService.success(`Vacation ${vacation.vacationId} has been deleted`);
        } catch (err: any) {
            notificationService.error(err);
        }
    }
    return (
        <div className="DeleteVacation">
            <div>
                <button onClick={deleteVacation}>🗑️</button>
            </div>
        </div>
    );
}

export default DeleteVacation;