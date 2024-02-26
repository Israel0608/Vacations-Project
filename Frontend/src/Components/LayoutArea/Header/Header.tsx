import { NavLink } from "react-router-dom"
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu"
import AddVacation from "../../DataArea/AddVacation/AddVacation"

import "./Header.css"

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <h1>🛫Vacations🛬</h1>
        </div>
    )
}

export default Header;