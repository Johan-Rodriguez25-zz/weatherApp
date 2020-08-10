import React, { useEffect, useState } from 'react'
import { Container, Content, Text, Body, H1, H2, H3, Button, Spinner } from 'native-base'
import styles from '../styles/weatherStyle'

const Weather = ({ route, navigation }) => {
    const [data, setData] = useState({
        city: route.params.city,
        country: route.params.country,
        name: '',
        countryCode: '',
        weatherDescription: '',
        temperature: '',
        humidity: '',
        windSpeed: '',
        backgroundColor: null,
        loading: true
    })

    useEffect(() => {
        obtenerDatos()
    })

    const apiKey = 'Your API key of openWeatherMap'

    const obtenerDatos = async () => {
        const APICode = await fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
        const resultCode = await APICode.json()

        const APIWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.code}&appid=${apiKey}&units=metric`)
        const resultWeather = await APIWeather.json()
        setData({
            name: resultWeather['name'] + ' /',
            countryCode: resultCode[0]['alpha2Code'],
            weatherDescription: resultWeather['weather'][0]['description'],
            temperature: resultWeather['main']['temp'] + ' °C',
            humidity: 'humidity: ' + resultWeather['main']['humidity'] + '%',
            windSpeed: resultWeather['wind']['speed'] + ' m/s',
            backgroundColor: resultWeather['main']['temp'] === undefined ? null : resultWeather['main']['temp'] >= 31 && resultWeather['main']['temp'] <= 50 ? styles.heat : resultWeather['main']['temp'] >= 15 && resultWeather['main']['temp'] <= 30 ? styles.ambient : styles.cold,
            loading: false
        })

        console.log(resultWeather['main']['temp'])
    }

    return (
        <Container style={data.backgroundColor}>
            <Content contentContainerStyle={styles.content}>
                {data.loading ? <Spinner color='blue' /> :
                    [
                        <H1 style={{ textAlign: 'center' }}>{data.name} {data.countryCode}</H1>,
                        <H2 style={styles.text}>{data.weatherDescription}</H2>,
                        <H3 style={styles.text}>{data.temperature}</H3>,
                        <Text style={styles.text}>{data.humidity}</Text>,
                        <Text style={styles.text}>{data.windSpeed}</Text>
                    ]
                }
            </Content>
        </Container>
    )
}

export default Weather