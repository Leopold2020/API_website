import { Link } from "react-router-dom";    
import "./links.css";

function links () {
    return(
        <>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page1">Page1</Link></li>
        </ul>
        </>
    )
}

export default links;