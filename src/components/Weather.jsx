import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import store from '../redux/store';
import { getWeatherId } from '../redux/weatherDuck.js';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getAPIdata = async () => {
        try {

            const url = 'https://jsonplaceholder.typicode.com/posts/1';
            let result = await fetch(url);
            const json = await result.json();
            //result = result.json();
            setData(json)
            console.warn(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // const getWeatherId2 = async ()  => {
    //     try {
            // const {offset} = getState().Service
    
            // console.warn('getWeatherId ');
            // const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/2`);
            
            // setData(data);
            // dispatch({
            //     type: GET_WEATHER_ID,
            //     payload: {
            //         array: response.data
            //     }
            // })  
    
    //     } catch(error) {
    //         console.warn(error)
    //     }
    // }

    useEffect(() => {
        //setData([]);
        dispatch(getWeatherId());
        //getAPIdata();
        //setData(getWeatherId())
    },[])    

    return (
        <View style={{ flex:1, padding: 24 }}>
            <Text style={{ fontSize:30 }}>API </Text>
            {
                data ?
                <View style = {styles.container}>
                    <Text style={{ fontSize:20 }}>
                        {data.id}
                    </Text>
                
                </View>
                : null
            }
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        align_Items: 'center',
        justifyContent: 'center',
    },
});

export default Weather;