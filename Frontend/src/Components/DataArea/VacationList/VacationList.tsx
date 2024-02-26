import React, { useEffect, useState } from "react";
import VacationsModel from "../../../Models/vacations-model";
import { authStore } from "../../../Redux/AuthState";
import dataService from "../../../Services/DataService";
import notificationService from "../../../Services/NotificationService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import CheckBox from "../CheckBox/CheckBox";
import { vacationsStore } from "../../../Redux/VacationState";
import CheckBoxDate from "../CheckBoxDate/CheckBoxDate";


function VacationList(): JSX.Element {
  const [feVacations, setFeVacations] = useState<VacationsModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage = 9;
  const navigate = useNavigate();

  const user = authStore.getState().user;
  const vacation = vacationsStore.getState().vacation

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationService.error("You must be logged in");
      navigate(appConfig.LoginRoute)
      return;
    }
    dataService.getAllVacationsByUser(user?.userId)
      .then(beVacations => setFeVacations(beVacations))
      .catch(err => notificationService.error(err));
  }, [vacation.length]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = feVacations.slice(indexOfFirstVacation, indexOfLastVacation);

  return (
    <div className="VacationList">

      <div>
        {authStore.getState().user?.roleId === 2 && (
          <CheckBox vacations={feVacations} setFilteredVacations={setFeVacations} />
        )}
      </div>

      <div>
        {authStore.getState().user?.roleId === 2 && (
          <CheckBoxDate vacations={feVacations} setFilteredVacations={setFeVacations}/>
        )}
      </div>
      {currentVacations.map(v => <VacationCard key={v.vacationId}
        vacationId={v.vacationId}
        vacationDestination={v.vacationDestination}
        description={v.description}
        checkIn={v.checkIn}
        checkOut={v.checkOut}
        isFollowing={v.isFollowing}
        followersCount={v.followersCount}
        price={v.price}
        image={v.image}
        imageUrl={v.imageUrl}
      />)}
      <div className="actions">
        {Array.from({ length: Math.ceil(feVacations.length / vacationsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VacationList;
