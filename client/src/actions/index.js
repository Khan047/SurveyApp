import axios from 'axios';
import {FETCH_USER, LOGOUT_USER} from './types';

export const fetchUser = () => async (dispatch)=>{

   const res = await axios.get('/api/current_user');

     dispatch({ type: FETCH_USER, payload: res.data  });

    };
    
export const logoutUser = () => async (dispatch) =>{
  alert('logging out')
  const res = await axios.get('/api/logout');
  alert('logging out')
console.log(res);
  dispatch({type: LOGOUT_USER});

};

export const submitSurvey = values =>{

    return {
      type : 'submit_survey'
    }
}