import "./PageNotFound.css";
import notFound from "../../../Assets/Images/page-not-found.jpeg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={notFound}/>
        </div>
    );
}

export default PageNotFound;
