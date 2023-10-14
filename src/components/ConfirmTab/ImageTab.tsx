// React / React-Native
import { FC, useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native'
// Types
import { IStepComponentProps } from '../../screens/auth/confirmScreen'
// Colors
import { mainColor, mainWhiteColor,  } from '../../styles/variables'
// Expo
import * as ImagePicker from 'expo-image-picker';
// API_URL
import {API_URL} from '../../../variables.json'
// Icons
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Axios / Storage
import axios from '../../axios/axios';
import storage from '../../../storage';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const ImageTab: FC<IStepComponentProps> = ({
    onNext
}) => {

    const [userInfo, setUserInfo] = useState<any>()

    const [firstImage, setFirstImage] = useState<any>({uri: null, base64: null})
    const [secondImage, setSecondImage] = useState<any>({uri: null, base64: null})
    const [threeImage, setThreeImage] = useState<any>({uri: null, base64: null})

    const pickImageFirst = async () => {
        let resultFirstImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!resultFirstImage.canceled) {
            setFirstImage({
                uri: resultFirstImage.assets[0].uri,
                base64: `data:image/jpg;base64,${resultFirstImage.assets[0].base64}`
            })
        }        
    }

    const pickImageSecond = async () => {
        let resultSecondImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!resultSecondImage.canceled) {
            setSecondImage({
                uri: resultSecondImage.assets[0].uri,
                base64: `data:image/jpg;base64,${resultSecondImage.assets[0].base64}`
            })
        }        
    }

    const pickImageThree = async () => {
        let resultThreeImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!resultThreeImage.canceled) {
            setThreeImage({
                uri: resultThreeImage.assets[0].uri,
                base64: `data:image/jpg;base64,${resultThreeImage.assets[0].base64}`
            })
        }        
    }

    useEffect(() => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(({data}) => {
                setUserInfo(data)
            })
        })
    }, [])

    const saveChanges = () => {

        let imageArr = [firstImage.base64, secondImage.base64, threeImage.base64]

        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.patch('/users/update', {
                icon: imageArr
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                console.log(res2.data);
                onNext()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        })

    }

    return(
        <View style={styles.conatiner}>
            <Text style={styles.title}>Загрузите свои фотографии</Text>

            <View style={styles.photoList}>
                <TouchableOpacity onPress={pickImageFirst}>
                    {!firstImage.base64 ? 
                        !userInfo?.icon.sort((a: any, b: any) => {return a.id - b.id})[0] ? 
                        <View style={styles.photoCard}>
                            <Icons name="file-image-plus" color={'white'} size={32}/>
                        </View>
                        : 
                        <Image source={{uri: `http://${API_URL}${userInfo?.icon?.sort((a: any, b: any) => {return a - b})?.[0]?.icon}`}} style={styles.photoCard}/> 
                        :
                        <Image source={{uri: firstImage.uri}} style={styles.photoCard}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImageSecond}>
                    {!secondImage.base64 ? 
                        !userInfo?.icon.sort((a: any, b: any) => {return a.id - b.id})[1] ?
                        <View style={styles.photoCard}>
                            <Icons name="file-image-plus" color={'white'} size={32}/>
                        </View>
                        : 
                        <Image source={{uri: `http://${API_URL}${userInfo?.icon?.sort((a: any, b: any) => {return a - b})?.[1]?.icon}`}} style={styles.photoCard}/> 
                        : 
                        <Image source={{uri: secondImage.uri}} style={styles.photoCard}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImageThree}>
                    {!threeImage.base64 ? 
                        !userInfo?.icon.sort((a: any, b: any) => {return a.id - b.id})[2] ? 
                        <View style={styles.photoCard}>
                            <Icons name="file-image-plus" color={'white'} size={32}/>
                        </View>
                        : 
                        <Image source={{uri: `http://${API_URL}${userInfo?.icon?.sort((a: any, b: any) => {return a - b})?.[2]?.icon}`}} style={styles.photoCard}/>  
                        : 
                        <Image source={{uri: threeImage.uri}} style={styles.photoCard}/>
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity onPress={saveChanges}
                    disabled={firstImage.base64 === null}
                >
                    <View style={[styles.button, {opacity: firstImage.base64 === null ? .3 : 1}]}>
                        <Text style={styles.buttonTitle}>Далее</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ImageTab

const styles = StyleSheet.create({
    conatiner: {
        height: SCREEN_HEIGHT - 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        

        position: 'relative'
    },
    title: {
        fontSize: 24,
        color: mainColor
    },
    photoList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 48,
    },
    photoCard: {
        borderWidth: 1,
        borderColor: '#9B21C6',
        backgroundColor: '#9B21C6',
        width: SCREEN_WIDTH / 3.3,
        height: SCREEN_WIDTH / 2.1,
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        paddingHorizontal: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    button: {
        backgroundColor: mainColor,
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '50%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        alignSelf: 'flex-end'
    },
    buttonTitle: {
        color: mainWhiteColor,
        fontSize: 18,
    }
})