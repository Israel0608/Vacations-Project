import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
// import VacationCard from "../../DataArea/VacationCard";
import appConfig from "../../../Utils/AppConfig";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import VacationList from "../../DataArea/VacationList/VacationList";
import AddVacation from "../../DataArea/AddVacation/AddVacation";
import DeleteVacation from "../../DataArea/DeleteVacation/DeleteVacation";
import Follwoers from "../../DataArea/Followers/Followers";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import VacationDetails from "../../DataArea/CheckBox/CheckBox";
import { Chart } from "react-chartjs-2";
import BarChart from "../../DataArea/AllFollowers/AllFollowers";
import AllFollowers from "../../DataArea/AllFollowers/AllFollowers";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>

                {/* Home Route */}
                <Route path="/home" element={<Home />} />

                {/* Add Route */}
                <Route path="/add-vacation" element={<AddVacation />} />

                <Route path="/vacations" element={<VacationList />} />

                {<Route path={"/followers"} element={<AllFollowers />} /> }

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* {<Route path={"/vacationById/" + ":vacationId"} element={<VacationDetails />} />} */}

                {/* <Route path={"/deleteVacation/" + ":vacationId"} element={<DeleteVacation />} /> */}


                <Route path={"/update/" + ":vacationId"} element={<EditVacation />} />

                {/* Page not found Route*/}
                <Route path="*" element={<PageNotFound />} />


                <Route path={appConfig.RegisterRoute} element={<Register />}></Route>

                <Route path={appConfig.LoginRoute} element={<Login />}></Route>

            </Routes>
        </div>
    );
}

export default Routing;
