// src/redux/weatherDuck.js
import axios from 'axios';

export const GET_WEATHER_ID_SUCCESS = 'GET_WEATHER_ID_SUCCESS';
export const GET_WEATHER_ID_FAILURE = 'GET_WEATHER_ID_FAILURE';

export const getWeatherId = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      dispatch({
        type: GET_WEATHER_ID_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_WEATHER_ID_FAILURE,
        payload: error.message
      });
    }
  };
};
