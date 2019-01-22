import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { IP } from '../../config';

// Action Types
export const FETCH_USER = 'FETCH_USER';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const CLEAR = 'CLEAR';

// Utilities
const getToken = async () => {
  const token =  await Expo.SecureStore.getItemAsync('token')
  return token;
}

//Action Creators

export const getUser = (token) => {
  return (dispatch) => {

     return axios.get(`http://${IP}:3000/user/user`, { 'headers': {'Authorization': token} })
      .then((response) => {
        if(response.data){
          dispatch({type: FETCH_USER, payload: response.data})
          return true
        }
      })
      .catch((err) => {
        return false
      })
  }
}

export const scanPoints = (points, flipScanner, navigation) => {
  return async (dispatch) => {
    const token = await getToken();
    const data = {
      points
    }

    axios.post(`http://${IP}:3000/scan/scan`, data, { 'headers': {'Authorization': token} })
      .then((response) => {
         dispatch(getUser(token));
         navigation.goBack(null);
         flipScanner();
         dispatch({type: SUCCESS, payload: response.data.message})
          setTimeout(() => {
            dispatch({ type: CLEAR })
          }, 3000)
      })
      .catch((err) => {
        console.log(err);
        //dispatch({type: ERROR, payload: err.data})
      })
  }
}

export const transfer = (data) => {
  return async (dispatch) => {
    const token = await getToken();

    axios.post(`http://${IP}:3000/transfer/transfer`, data, { 'headers': {'Authorization': token} })
      .then((response) => {
         dispatch(getUser(token));
         //navigation.goBack(null);
         dispatch({type: SUCCESS, payload: response.data.message})
          setTimeout(() => {
            dispatch({ type: CLEAR })
          }, 3000)
      })
      .catch((err) => {
        //console.log(err);
        dispatch({type: ERROR, payload: err.response.data.message})
        setTimeout(() => {
          dispatch({ type: CLEAR })
        }, 3000)
      })
  }
}

export const errorMsg = (msg) => {
  return dispatch => {
    dispatch({type: ERROR, payload: msg})
     setTimeout(() => {
       dispatch({ type: CLEAR })
     }, 3000)
  }
}

export const signOut = (navigate) => {
  return dispatch => {
    Expo.SecureStore.deleteItemAsync('token')
      .then(() => {
        navigate('Auth')
        dispatch({type: 'SIGNED_OUT'})
      })
      .catch((e) => {
        console.log(e);
        dispatch({type: 'SIGNED_OUT'})
      })
  }
}
