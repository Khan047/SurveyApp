
import React, { Component } from "react";

class Header extends Component{

    render(){
       return( 
       <nav>
           <div className="#bf360c deep-orange darken-4 nav-wrapper">
               <a className = "left brand-logo">
                   SurveyApp
               </a>
               <ul className="right">
                   <li>
                       <a>Login with Google</a>
                   </li>
               </ul>
           </div>
       </nav>
       );
    }
}
export default Header;