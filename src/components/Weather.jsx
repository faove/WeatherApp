import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StyleSheet, Image, View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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

const requestLocationPermission = async () => {
    try {
         const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permiso Geolocation ',
              message: 'Podemos acceder a su localización?',
              buttonNeutral: 'Preguntar después',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          //console.log('granted', granted);
          if (granted === 'granted') {
            //console.warn('You can use Geolocation', granted);
            return true;
          } else {
            //console.log('You cannot use Geolocation');
            return false;
          }
         
    } catch (err) {
        return false;
    }
};

const Weather = () => {
    
    let api_key = '040f34faff678040d575cbf5826ee65a';

    // const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [location, setLocation] = useState(true);

    // const getLocation = () => {

    //     const result = requestLocationPermission();

    //     result.then(res => {
    //         if (res) {
    //             Geolocation.getCurrentPosition(
    //                 position => {
    //                     //console.log(position);
    //                     setLocation(position);
    //                 },
    //                 error => {
    //                     // console.log(error.code, error.message);
    //                     setLocation(false);
    //                 },
    //                 {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //             );
    //         }        
    //     });
    // }

    // const getWeatherId = async ()  => {
    //     try {
    //         if (location && location.coords) {
    //             // console.log(location.coords.latitude);
    //             const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&lang=es&appid=040f34faff678040d575cbf5826ee65a`);
    //             setData(data);
    //         // } else {
    //         //     const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Cordoba,AR&units=metric&lang=es&&appid=040f34faff678040d575cbf5826ee65a`);
    //         //     setData(data);
    //             // Manejar el caso donde no hay datos de ubicación disponibles
    //         }
    
    //     } catch(error) {
    //         console.warn(error)
    //     }
    // }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getLocation();
    //         getWeatherId();
    //     }, 3000);
    // },[])    

    useEffect(() => {
        const fetchData = async () => {
            const permissionGranted = await requestLocationPermission();
            if (permissionGranted) {
                Geolocation.getCurrentPosition(
                    position => {
                        setLocation(position);
                        setLoading(false);
                    },
                    error => {
                        console.warn(error.code, error.message);
                        setLoading(false);
                    },
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
                );
            } else {
                setLoading(false);
            }
        };
    
        const fetchWeatherData = async () => {
            if (location && location.coords) {
                try {
                    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&lang=es&appid=040f34faff678040d575cbf5826ee65a`);
                    setData(data);
                } catch (error) {
                    console.warn(error);
                }
            }
        };
    
        const updateWeather = async () => {
            await fetchData();
            await fetchWeatherData();
            setTimeout(updateWeather, 120000); // Actualizar cada 2 minuto
        };
    
        updateWeather();
    
        // Limpieza
        return () => clearTimeout();
    }, [location]);

    return (
        <View style={ styles.container }>
            <Text style={styles.text}>Estado del Tiempo</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
            ) : null}
            {
                data && data.weather && data.weather.length > 0 ?
                <View style={ styles.container }>
                    <Image style={styles.image} source={{uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}} />
                    <Text style={styles.text}>
                        {data.weather[0].description}
                    </Text>
                </View>
                : null
            }
            {
                data && data.main ?
                <View style={ styles.container }>
                    <View style={ styles.container }>
                        <Text style={styles.textBig}>
                            {data.main.temp} C°
                        </Text>
                    </View>
                    <View style={ styles.containerrow }>
                    <Image style={styles.image_humidity} source={require('../assets/humidity.png')} />
                    <Text style={styles.text}>
                        {data.main.humidity} %
                    </Text>
                    <Image style={styles.image_humidity} source={require('../assets/wind.png')} />
                    <Text style={styles.text}>
                        {data.main.humidity} m/s
                    </Text>
                    </View>
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
    containerrow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.backgrounds.backgroundPrimary,
        alignItems: 'stretched',
    },
    container_column: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 300,
        height: 300,
        backgroundColor: theme.color.textSecondary,
    },
    text:{
        color: theme.color.white,
        padding:10,
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
    image_humidity: {
        width: 50,
        height: 50,
        borderRadius: 6
    }
});

export default Weather;