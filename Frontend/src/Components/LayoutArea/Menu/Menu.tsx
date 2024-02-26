import { NavLink } from "react-router-dom";
import "./Menu.css";
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";

function Menu(): JSX.Element {
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        const fetchRoleId = () => {
            try {
                const user = authStore.getState().user;
                setRoleId(user?.roleId);
            } catch (error) {
                console.error("Error fetching roleId:", error);
            }
        };
        fetchRoleId();
        const unsubscribe = authStore.subscribe(() => {
            fetchRoleId();
        });
        return () => {
            unsubscribe();
        };

    }, []);
    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <NavLink to="/vacations">Vacations</NavLink>

            {roleId === 1 && (
                <NavLink to="/followers">All-Followers</NavLink>
            )}

            {roleId === 1 && (
                <NavLink to="/add-vacation">Add-Vacation</NavLink>
            )}
        </div>
    )
}
export default Menu;