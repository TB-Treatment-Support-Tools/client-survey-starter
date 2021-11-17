import { Link } from "react-router-dom";

export default function Adherence() {
    return(
        <div> 
            <p>Yes</p>
            <p>No</p>
            <Link to="/survey/2">Next</Link>
        </div>
    )
}