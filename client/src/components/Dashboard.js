import React from "react";
import {Link} from "react-router-dom";
const Dashboard = () => {

    return (
        
            <div>
            Dashboard
            <div className = "fixed-action-btn">
                <Link to = "/survey/new" className = "btn-floating btm-large red ">
                    <i className = "material-icons">add</i>
                </Link>
            </div>
            </div>
        
    );
};
export default  Dashboard;