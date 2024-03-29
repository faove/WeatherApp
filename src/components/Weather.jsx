import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StyleSheet, Image, View, Text } from 'react-native';
// import { useDispatch, useSelector} from 'react-redux';
import { getWeatherId } from '../redux/weatherDuck.js';
import store from '../redux/store';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import theme from './theme.js';

const Weather = () => {
    
    let api_key = '040f34faff678040d575cbf5826ee65a';

    // const dispatch = useDispatch()
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

    const getWeatherId = async ()  => {
        try {
            //const {offset} = getState().Service
    
            // console.warn('getWeatherId ');
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Cordoba,AR&units=metric&lang=es&&appid=040f34faff678040d575cbf5826ee65a`);
            //const json = await data.json();
            console.warn(data);
            setData(data);
            // dispatch({
            //     type: GET_WEATHER_ID,
            //     payload: {
            //         array: response.data
            //     }
            // })  
    
        } catch(error) {
            console.warn(error)
        }
    }

    useEffect(() => {
        //setData('');
        getWeatherId();
    },[])    

    return (
        <View style={ styles.container }>
            <Text style={styles.text}>Estado del Tiempo</Text>
            <View style={{padding:10}}>
                {/* <Image style={styles.image} source={require('../assets/cloud.png')} /> */}
            </View>
            {
                data && data.weather && data.weather.length > 0 ?
                <View style = {styles.box}>
                    <Image style={styles.image} source={{uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}} />
                    <Text style={styles.text}>
                        {data.weather[0].description}
                    </Text>
                </View>
                : null
            }
            {
                data && data.main ?
                <View style = {styles.container}>
                    <Text style={styles.textBig}>
                        {data.main.temp} C°
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
        backgroundColor: theme.backgrounds.backgroundPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        alignItems: 'center',
      },
    text:{
        color: theme.color.white,
        fontSize: theme.fontSizes.subheadings,
    },
    textSmall:{
        flex: 1,
        color: theme.color.white,
        fontSize: theme.fontSizes.body,
    },
    textBig:{
        flex: 1,
        color: theme.color.white,
        fontSize: theme.fontSizes.headings,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 6
    },
});

export default Weather;