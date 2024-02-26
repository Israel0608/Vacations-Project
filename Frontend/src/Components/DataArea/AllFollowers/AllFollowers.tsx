import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import VacationsModel from "../../../Models/vacations-model";
import { authStore } from "../../../Redux/AuthState";
import dataService from "../../../Services/DataService";
import notificationService from "../../../Services/NotificationService";
import { CSVLink } from "react-csv";
import "./AllFollowers.css";
import appConfig from '../../../Utils/AppConfig';
import { useNavigate } from 'react-router-dom';


function AllFollowers(): JSX.Element {
  ChartJS.register([CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend]);
  const [feVacations, setFeVacations] = useState<VacationsModel[]>([]);
  const user = authStore.getState().user;
  const navigate = useNavigate()

  useEffect(() => {
    dataService.getAllVacationsByUser(user?.userId)
      .then(X => {
        setFeVacations(X);
      }).catch(err => notificationService.error(err))
  }, [user]);

  useEffect(() => {
    if (!authStore.getState().token) {
      notificationService.error("You must be logged in");
      navigate(appConfig.LoginRoute)
      return;
    }
 }, [])

  const x: string[][] = [
    ['VacationDestination', 'FollowersCount'], 
    ...feVacations.map(v => [v.vacationDestination, v.followersCount.toString()])
];


  const labelsData = feVacations.map(f => `${f.vacationDestination}`)
  const info = feVacations.map(f => `${f.followersCount}`)


  const data = {
    labels: labelsData,
    datasets: [{
      label: 'Vacation Followers',
      data: info,
      backgroundColor: [
        'blue',
      ],
      borderColor: [
        'white',
      ],
      borderWidth: 3,
    }],
  };
  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1
        }
      }
    }
  }
  return (
    <div>
      <CSVLink data={x} filename='csv.csv'>
        <button>Go</button>
      </CSVLink>
      <Bar className="chart" data={data} options={options} />
    </div>
  );
}

export default AllFollowers;
