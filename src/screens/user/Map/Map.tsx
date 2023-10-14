// React / React-Native
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useCallback, useEffect, useState } from "react"
import * as Location from 'expo-location'
import MapView, { Circle, Marker, Polyline } from 'react-native-maps'
// Components
import BottomBankNavigation from "../../../components/BottomBankNavigation/BottomBankNavigation"
import BottomSheetBankFilter from "../../../components/BottomSheetBankFilter/BottomSheetBankFilter"
// Styles
import { mainBlue, mainDarkBlue, mainDefaultWhite, mainOpacityDarkBlue, mainOpacityWhite, mainWhite } from "../../../styles/colorConst"
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Variables
import { MAP_API_KEY } from '../../../../variables.json'
// Storage / Axios
import storage from "../../../../storage"
import axios from "../../../axios/axios"
import BottomSheetAchivments from "../../../components/BottomSheetAchivments/BottomSheetAchivments"

const Map = () => {

    const [routeCoordinates, setRouteCoordinates] = useState<any[]>([])
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
    const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
    const [circleRadius, setCircleRadius] = useState<number>(100);

    const [polylineCoordinates, setPolylineCoordinates] = useState([]);

    const [selectBank, setSelectBank] = useState<any>()
    const [banks, setBanks] = useState<any[]>([]);
    const [mapBanks, setMapBanks] = useState<any[]>([]);
    const [filterBanks, setFilterBanks] = useState<any[]>([])
    
    const [bankNavigation, setBankNavigation] = useState<boolean>(false)
    const [bankFilter, setBankFilter] = useState<boolean>(false)
    const [achivments, setAchivments] = useState<boolean>(false)

    const [isLoadingRoute, setIsLoadingRoute] = useState(false);

    const switchVisibility = useCallback(() => {
        setBankNavigation(prev => !prev)
    }, [])

    const switchVisibilityFilter = useCallback(() => {
        setBankFilter(prev => !prev)
    }, [])

    const switchVisibilityAchivmnets = useCallback(() => {
        setAchivments(prev => !prev)
    }, [])

    useEffect(() => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            return axios.get('/bank/findAll', {headers: {Authorization: `Bearer ${res.accessToken}`}});
        })
        .then(res2 => {
            setBanks(res2.data);
            fetchLocation()
            setIsLoadingRoute(true)
        })
        .catch(error => {
            console.error('Error fetching banks:', error);
        });        

    }, [isLoadingRoute]);

    const fetchLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(  
            'Упс',  
            'Разрешение на доступ к местоположению было отклонено. Перейдите в настройки и разрешите приложению использовать геолокацию',  
            [  
                {  
                    text: 'Понятно',  
                    style: 'cancel',  
                },  
            ]  
        );  
            setLocationPermission(false);
            return;
        }

        const bankInfoPromises = banks.map(async (bank) => {
            const info = await Location.geocodeAsync(bank.address);
            return { bank: bank, info: info[0] };
        });

        const bankInfo = await Promise.all(bankInfoPromises);
        setMapBanks(bankInfo);

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
    };

    const selectBankClick = (bank: any) => {
        setSelectBank(bank)
        switchVisibility()
    }

    const changeRoute = async (type: string) => {
        const startPoint = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
        const endPoint = `${selectBank.info.latitude},${selectBank.info.longitude}`;
    
        try {
            const response = await fetch(
                `https://api.tomtom.com/routing/1/calculateRoute/${startPoint}:${endPoint}/json?key=${MAP_API_KEY}&routeType=eco&travelMode=${type}`
            );
            const data = await response.json();
    
            if (data.routes && data.routes.length > 0) {
                const coordinates = data.routes[0].legs[0].points.map(point => ({
                    latitude: point.latitude,
                    longitude: point.longitude
                }));
                setRouteCoordinates(coordinates);
            } else {
                console.error('No route found.');
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    useEffect(() => {
        if (filterBanks.length > 0) {
            fetchLocationFilter();
            setIsLoadingRoute(true);
            setRouteCoordinates([]);
        }
    }, [filterBanks]);

    const useFilter = (ids: number[]) => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get(`/bank/filter?serviceIds=${ids}`, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                setFilterBanks(res2.data.map(bank => {
                    return { bank: bank.bank, workload: bank.workload}
                }))
            })
        })
    }

    const fetchLocationFilter = async () => {
        const bankInfoPromises = filterBanks.map(async (bank) => {
            const info = await Location.geocodeAsync(bank.bank.address);
            return { bank: bank.bank, info: info[0], workload: bank.workload };
        });

        const bankInfo = await Promise.all(bankInfoPromises);
        setMapBanks(bankInfo);
        setRouteCoordinates([])
    };

    useEffect(() => {
        console.log('test');
    }, [polylineCoordinates])

    const removeFilter = () => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            return axios.get('/bank/findAll', {headers: {Authorization: `Bearer ${res.accessToken}`}});
        })
        .then(res2 => {
            setBanks(res2.data);
            fetchLocation()
            setRouteCoordinates([])
        })
        .catch(error => {
            console.error('Error fetching banks:', error);
        });        
    }

    if (locationPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Нет разрешения на доступ к местоположению.</Text>
            </View>
        );
    }

    if (!currentLocation) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isLoadingRoute) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    return(
        <View style={styles.container}>
            
            <View style={styles.upFilter}>

                <View style={styles.buttonFilter}>
                    <TouchableOpacity onPress={removeFilter}>
                        <View style={styles.buttonFilterClick}>
                            <Icon name="repeat" size={22} color={mainDefaultWhite}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonFilter}>
                    <TouchableOpacity onPress={switchVisibilityFilter}>
                        <View style={styles.buttonFilterClick}>
                            <Ionicons name="filter" size={22} color={mainDefaultWhite}/>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            {
                isLoadingRoute ?

                <MapView 
                    style={styles.container} 
                    userInterfaceStyle="dark"
                    initialRegion={{
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker 
                        coordinate={{
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        }}
                        isPreselected={true}
                        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                    >

                        <View style={styles.selfMarker}>
                            <Icon name="user-o" size={20} color={mainWhite}/>
                        </View>

                    </Marker>

                    <Circle
                        center={{
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        }}
                        radius={circleRadius}
                        strokeColor={mainOpacityWhite} 
                        fillColor={mainOpacityDarkBlue}
                    />

                    {routeCoordinates.length > 1 && 
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeWidth={4}
                            strokeColor={mainBlue}
                        />
                    }

                    {mapBanks.map((bank: any, index: number) => 
                        bank.workload ? 
                        <Marker key={index} coordinate={{
                            latitude: bank.info?.latitude,
                            longitude: bank.info?.longitude,
                        }}>
                            <TouchableOpacity onPress={() => selectBankClick(bank)}>
                                <View 
                                    style={[styles.bankMarker, 
                                        {
                                            borderColor: 
                                                bank.workload[0].workload === 'min' 
                                                ? 
                                                    'green' : 
                                                bank.workload[0].workload === 'avarage' ?
                                                    'orange'
                                                :
                                                bank.workload[0].workload === 'max' ?
                                                    'red' :
                                                mainBlue 

                                        }]}
                                >
                                    
                                </View>
                            </TouchableOpacity>
                        </Marker>
                        : 
                        <Marker key={index} coordinate={{
                            latitude: bank.info?.latitude,
                            longitude: bank.info?.longitude,
                        }}
                        >
                            <TouchableOpacity style={{marginBottom: 6, width: 44, height: 44}} onPress={switchVisibilityAchivmnets}>
                                <Image source={require('../../../../assets/medal/blueMedal.png')} style={{width: '100%', height: '100%'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => selectBankClick(bank)} style={{marginBottom: 12}}>
                                <View style={styles.bankMarker}>
                                    
                                </View>
                            </TouchableOpacity>
                        </Marker>
                    )}
                </MapView>

                :

                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            }


            <BottomBankNavigation 
                opened={bankNavigation}
                closeModal={switchVisibility}
                changeRoute={changeRoute}
                bank={selectBank}
            />

            <BottomSheetBankFilter 
                opened={bankFilter}
                closeModal={switchVisibilityFilter}
                saveFilter={useFilter}
            />

            <BottomSheetAchivments 
                opened={achivments}
                closeModal={switchVisibilityAchivmnets}
            />

        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: mainDarkBlue,
        position: 'relative'
    },
    selfMarker: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: mainBlue,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bankMarker: {
        width: 24,
        height: 24,
        backgroundColor: mainDefaultWhite,
        borderWidth: 4,
        borderColor: mainBlue,
        borderRadius: 100,
        marginBottom: 24
    },
    marker: {
        position: 'relative',
    },
    medal:{
        position: 'absolute',
        width: 44,
        height: 44,
        bottom: 32,
        left: -10
    },
    upFilter: {
        position: 'absolute',
        top: 68,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,

        paddingHorizontal: 20,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonFilter: {
        width: 52,
        height: 52,
    },
    buttonFilterClick: {
        width: '100%',
        height: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#000000c9',

        borderRadius: 100
    }
})