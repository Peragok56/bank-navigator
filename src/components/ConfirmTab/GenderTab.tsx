// React / React - Native
import { FC, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
// Types
import { IStepComponentProps } from "../../screens/auth/confirmScreen";
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Colors
import { mainColor, mainWhiteColor } from "../../styles/variables";
// Storage & Axios
import storage from "../../../storage";
import axios from "../../axios/axios";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const GenderTab: FC<IStepComponentProps> = ({
    onNext,
    onPrev
}) => {

    const [gender, setGender] = useState<string>('')

    const saveChanges = () => {
        
        storage.load({
            key: 'token'
        })
        .then(res => {

            axios.patch('/users/update', {
                gender
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                console.log(res2.data);
                onNext()
            })
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Выберите пол</Text>

            <View style={styles.genderSlide}>
                <TouchableOpacity onPress={() => setGender('male')}>
                    {gender === 'male' ? 
                    <View style={[styles.genderCard, {backgroundColor: mainColor}]}>
                        <Icon name="male" size={32} color={'white'}/>
                        <Text style={[styles.genderText, {color: 'white'}]}>Мужчина</Text>
                    </View> 
                    : 
                    <View style={styles.genderCard}>
                        <Icon name="male" size={32} color={mainColor}/>
                        <Text style={styles.genderText}>Мужчина</Text>
                    </View>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGender('female')}>
                    {gender === 'female' ? 
                    <View style={[styles.genderCard, {backgroundColor: mainColor}]}>
                        <Icon name="female" size={32} color={'white'}/>
                        <Text style={[styles.genderText, {color: 'white'}]}>Женщина</Text>
                    </View> 
                    : 
                    <View style={styles.genderCard}>
                        <Icon name="female" size={32} color={mainColor}/>
                        <Text style={styles.genderText}>Женщина</Text>
                    </View>}
                </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity onPress={onPrev}>
                    <View style={styles.buttonBack}>
                        <Text style={styles.buttonTitleBack}>Назад</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveChanges}
                    disabled={gender === '' ? true : false}
                >
                    <View style={[styles.button, {opacity: gender === '' ? .3 : 1}]}>
                        <Text style={styles.buttonTitle}>Далее</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GenderTab

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - 125,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        position: 'relative'
    },
    title: {
        fontSize: 24,
        color: mainColor
    },
    genderSlide: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: 18,
        marginBottom: 16,
    },
    genderCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 36,
        paddingVertical: 8,
        borderRadius: 18,
    },
    genderText: {
        color: mainColor,
        fontWeight: '500'
    },
    buttonView: {
        paddingHorizontal: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: mainColor,
        borderWidth: 2,
        borderColor: mainColor,
        paddingVertical: 8,
        paddingHorizontal: 48,
        borderRadius: 12,
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBack: {
        borderColor: mainColor,
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 48,
        borderRadius: 12,
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: mainWhiteColor,
        fontSize: 18,
    },
    buttonTitleBack: {
        color: mainColor,
        fontSize: 18,
    }
})