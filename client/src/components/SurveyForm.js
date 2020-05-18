import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyFeild from './SurveyField';
import _ from 'lodash';
import valEmails from '../utils/valEmails';
import { Link } from 'react-router-dom';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields(){
        return _.map(formFields, ({label, name}) => {
            return( <Field key={name} component={SurveyFeild} type = "text"   label={label}   name = {name}/>)
        })
    }
    render(){
        return(
           <div>
               <form onSubmit = {this.props.handleSubmit(this.props.onSurveySubmit)} >
               {this.renderFields()}
               <Link to="/surveys" className="red  white-text btn-flat">Cancel</Link>
               <button className="red right white-text btn-flat" type="submit">Next <i className= "material-icons right">done</i></button>
               
               </form>
           </div> 
        );
    }
}

function validate(values){
    const errors = {};
    errors.emails = valEmails(values.emails ||'');
_.each(formFields, ({name}) =>{
    if(!values[name]){
        errors[name] = 'Provide a value';
    }
});
    

    return errors;
}

export default reduxForm({
     validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);