
import React, { Component } from "react";
import { connect } from "react-redux";
class Header extends Component{
    renderContent(){
         switch (this.props.auth){
             case null :
                return 'idk';
             case false:
                return 'logged out';
            default:
                return 'logged in !';
         }   
    }
    render(){
        console.log(this.props);
       
       return( 
       <nav>
           <div className="#bf360c deep-orange darken-4 nav-wrapper">
               <a className = "left brand-logo">
                   SurveyApp
               </a>
               <ul className="right">
                  {this.renderContent()}
               </ul>
           </div>
       </nav>
       );
    }
}
function mapStateToProps({auth}){
    return {auth};
}
export default connect(mapStateToProps)(Header);