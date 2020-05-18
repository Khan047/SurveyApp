import _ from 'lodash';
import React from 'react';
import SurveyForm from './SurveyForm';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../actions'
const SurveyFormReview = ({ onCancel, formValues, submitSurvey  }) => {
 const rfields = _.map(formFields , (field) =>{
    return( <div>
         <label>{field.label}</label>
         <div>
             {formValues[field.name]}
         </div>
     </div>);
 })

  return (
    <div>
        <h5>Please review you entries</h5>
        <div>
            <div>
            <label>Survey Title</label>
            <div>{formValues.Title}</div>
            </div>
            
            
        </div>
        {rfields}
        <button className= " yellow btn-flat" onClick={onCancel}>
            Back
        </button>
        <button className="right" onClick={()=>actions.submitSurvey(formValues)}> Send Survey</button>
        
    </div>
  );
};

function mapStateToProps(state){
    console.log(state);
    return {formValues: state.form.surveyForm.values };

}

export default connect(mapStateToProps, actions)(SurveyFormReview);