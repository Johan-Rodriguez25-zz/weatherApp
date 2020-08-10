import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/searchStyle'
import { FlatList } from 'react-native'
import { Form, Item, Input, Label, Button, Text, Card, CardItem, H1 } from 'native-base'
import * as Animatable from 'react-native-animatable'
import { useNetInfo } from '@react-native-community/netinfo'

const Search = ({ navigation }) => {
    const [city, setCity] = useState(''),
        [cities, setCities] = useState(null),
        [country, setCountry] = useState(null)

    useEffect(() => {
        obtenerDatos()
    })

    const netInfo = useNetInfo()

    const apiKey = 'Your API key of Google Place Autocomplete'

    const obtenerDatos = async () => {
        const datos = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${apiKey}`)
        const json = await datos.json()
        setCities(json.predictions)
    }

    return (
        <Animatable.View animation='bounceIn' style={styles.content}>
            {netInfo.isConnected && netInfo.isInternetReachable ?
                <Form>
                    <Item stackedLabel>
                        <Label>City</Label>
                        <Input onChangeText={text => setCity(text)} value={city} />
                    </Item>
                    <Item stackedLabel>
                        <Label>Country</Label>
                        <Input onChangeText={text => setCountry(text)} value={country} />
                    </Item>
                    <Button block style={styles.button} onPress={() => {
                        navigation.navigate('Weather', {
                            city,
                            country
                        })
                    }}>
                        <Text>SAVE CHANGES</Text>
                    </Button>
                    <FlatList
                        data={cities}
                        renderItem={({ item }) => (
                            <Card style={styles.list}>
                                <CardItem bordered>
                                    <Button transparent onPress={() => {
                                        setCity(item['structured_formatting']['main_text'])
                                        setCountry(item['terms'][item.terms.length - 1]['value'])
                                    }}>
                                        <Text style={{ color: 'black' }}>{item['structured_formatting']['main_text']}, {item['terms'][item.terms.length - 1]['value']}</Text>
                                    </Button>
                                </CardItem>
                            </Card>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Form> : <H1 style={styles.textOffline}>Lo sentimos, para usar esta App tienes que estar conectado a internet</H1>}
        </Animatable.View>
    )
}

export default Search