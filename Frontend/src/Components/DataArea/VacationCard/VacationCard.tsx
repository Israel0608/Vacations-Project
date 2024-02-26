import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './VacationCard.css';
import VacationsModel from '../../../Models/vacations-model';
import dataService from '../../../Services/DataService';
import notificationService from '../../../Services/NotificationService';
import authService from '../../../Services/authService';
import { authStore } from '../../../Redux/AuthState';
import DeleteVacation from '../DeleteVacation/DeleteVacation';
import EditVacation from '../EditVacation/EditVacation';
import Followers from '../Followers/Followers';
import AddVacation from '../AddVacation/AddVacation';
import AllFollowers from '../AllFollowers/AllFollowers';
import CheckBoc from "../CheckBox/CheckBox";
import CheckBox from '../CheckBox/CheckBox';

function VacationCard(vacation: VacationsModel): JSX.Element {
    const [userRole, setUserRole] = useState<number | null>(null);

    return (
        <div className="vacationCard">
            <div>
                {authStore.getState().user?.roleId === 1 && <DeleteVacation {...vacation} />}
            </div>
            <div>
                {authStore.getState().user?.roleId === 1 && (
                    <NavLink to={`/update/${vacation.vacationId}`}>
                        <button>👨‍🔧</button>
                    </NavLink>
                )}
            </div>
            <div>
                {authStore.getState().user?.roleId === 2 && (
                    <Followers
                        isFollow={vacation.isFollowing}
                        userId={authStore.getState().user?.userId.toLocaleString()}
                        vacationId={vacation.vacationId.toLocaleString()}
                        followersCount={vacation.followersCount}
                    />
                )}
            </div>
            <div>
                VacationDestination: {vacation.vacationDestination}
                <hr />
                CheckIn: {new Date(vacation.checkIn).toLocaleDateString()}
                <br />
                CheckOut: {new Date(vacation.checkOut).toLocaleDateString()}
                <br />
                Price: {vacation.price}$
                <div>
                    <img src={vacation.imageUrl} alt={vacation.vacationDestination} />
                </div>
            </div>
            Description: <div className="description">{vacation.description}</div>
        </div>
    );
}

export default VacationCard;