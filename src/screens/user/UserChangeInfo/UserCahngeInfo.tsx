// React / React-Native
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// Styles
import { mainBlue, mainDarkBlue, mainDefaultWhite, mainWhite } from "../../../styles/colorConst";
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// image-Picker
import * as ImagePicker from 'expo-image-picker';
// Storage / Axios
import storage from "../../../../storage";
import axios from "../../../axios/axios";
// hooks
import { profileAction } from "../../../hooks/profileAction";
import { useTypedSelector } from "../../../hooks/userTypedSelector";
import { useNavigation } from "@react-navigation/native";
// Const
import { API_URL } from '../../../../variables.json'

const UserCahngeInfo = () => {

    const {setNewInfoForProfile} = profileAction()
    const { fetchProfile } = profileAction()
    const {user, loading, error} = useTypedSelector(state => state.profile)

    useEffect(() => {
        fetchProfile()

        setName(user?.firstName)
        setPhoneNumber(user?.phoneNumber)
        setEmail(user?.email)
    }, [])

    const navigation = useNavigation()

    const [image, setImage] = useState<any>({uri: null, base64: null})
    const [name, setName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const pickImage = async () => {
        let resultFirstImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!resultFirstImage.canceled) {
            setImage({
                uri: resultFirstImage.assets[0].uri,
                base64: `data:image/jpg;base64,${resultFirstImage.assets[0].base64}`
            })
        }        
    }

    const changeUserInfo = () => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.patch('/users/update', {
                icon: image.base64,
                firstName: name,
                phoneNumber: phoneNumber,
                email: email
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${res.accessToken}`}})
                .then(res3 => {
                    setNewInfoForProfile(res3.data)
                    Alert.alert(
                        "Отлично",
                        `Данные сохранены`,
                        [
                          {
                            text: `Понятно`,
                            onPress: () => navigation.goBack(),
                            style: "cancel",
                          },
                        ],
                      );
                })
            })
            .catch(err => {
                Alert.alert(
                    "Упс",
                    `${typeof err.response.data.messages == typeof [] ?
                      err.response.data.messages[0] : 
                      err.response.data.messages}`,
                    [
                      {
                        text: `Понятно`,
                        style: "cancel",
                      },
                    ],
                  );
            })
        })
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.mainContainer}>

                <View style={styles.Avatar}>
                    <View style={styles.avatarButton}>
                        <TouchableOpacity 
                            style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            onPress={pickImage}
                        >
                            {!image.base64 ? 
                                !user?.icon ?
                                <Icon name="user-o" size={84} color={mainWhite}/> 
                                : 
                                <Image source={{uri: `http://${API_URL}${user?.icon}`}} style={{width: '100%', height: '100%'}}/> 
                                : 
                                <Image source={{uri: image.uri}} style={{width: '100%', height: '100%'}}/> 
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.inputText}>Имя</Text>
                <TextInput 
                    style={styles.input}
                    value={name}
                    onChangeText={e => setName(e)}
                />

                <Text style={styles.inputText}>Номер телефона</Text>
                <TextInput 
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={e => setPhoneNumber(e)}
                    keyboardType="number-pad"
                    maxLength={11}
                />

                <Text style={styles.inputText}>Почта</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={e => setEmail(e)}
                />

                <TouchableOpacity style={{width: '100%', marginTop: 24}} onPress={changeUserInfo}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Сохранить</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default UserCahngeInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    mainContainer: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 74
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: mainBlue,
        borderRadius: 6,
        marginBottom: 8,
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    inputText: {
        width: '100%',
        fontSize: 16,
        marginBottom: 4
    },
    button: {
        width: '100%',
        backgroundColor: mainDarkBlue,
        padding: 8,
        borderRadius: 6
    },
    buttonText:{
        width: '100%',
        color: mainDefaultWhite,
        textAlign: 'center'
    },
    Avatar: {
        width: 175,
        height: 175,
        borderRadius: 100,
        overflow: 'hidden'
    },
    avatarButton: {
        width: '100%',
        height: '100%',
        backgroundColor: mainBlue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})