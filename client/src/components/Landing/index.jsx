import { Link } from "react-router-dom";
import './Landing.css'

function Landing() {
    return (
        <div className="bgLand">
            <h2 className="h2Land"> WELCOME TO PI FOOD </h2>
            <Link to="/home">
                <button className="btn">Let's go!</button>
            </Link>
        </div>
    )
}

export default Landing;