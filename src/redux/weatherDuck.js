import axios from 'axios';

const dataInicial =  {
    array : [],
    offset: 0
}

const GET_WEATHER = 'GET_WEATHER'
const GET_WEATHER_ID = 'GET_WEATHER_ID'
const GET_WEATHER_NEXT = 'GET_WEATHER_NEXT'
const POST_WEATHER_ADD = 'POST_WEATHER_ADD'
const DELETE_WEATHER = 'DELETE_WEATHER'
const UPDATE_WEATHER = 'UPDATE_WEATHER'


export const getWeatherId = () => async ()  => {

    try {
        // const {offset} = getState().Service
        console.warn('getWeatherId');
        // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
        
        // console.warn(response.data);

        // dispatch({
        //     type: GET_WEATHER_ID,
        //     payload: {
        //         array: response.data
        //     }
        // })  

    } catch(error) {
        console.log(error)
    }

}



//Get Weather Id current
export const getWeatherId2 = () => async (dispatch)  => {

    try {
        // const {offset} = getState().Service

        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
        
        console.warn(response.data);

        dispatch({
            type: GET_WEATHER_ID,
            payload: {
                array: response.data
            }
        })  

    } catch(error) {
        console.log(error)
    }

}