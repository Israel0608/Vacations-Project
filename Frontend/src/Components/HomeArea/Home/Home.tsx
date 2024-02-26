import "./Home.css";
import welcomeImage from "../../../Assets/Images/Home.jpeg"

function Home(): JSX.Element {
    return (
        <div className="Home">
            <img src={welcomeImage} />
        </div>
    );
}

export default Home;
