// React / React-Native
import { FC, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
// Axios / Storage
import storage from "../../../storage";
import axios from "../../axios/axios";
// Types
import { IStepComponentProps } from "../../screens/auth/confirmScreen";
import { mainColor, mainWhiteColor } from "../../styles/variables";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const HobbiesTab: FC<IStepComponentProps> = ({
    onNext,
    onPrev
}) => {

    const [hobbies, setHobbies] = useState<any[]>([])
    const [selectHobbies, setSelectHobbies] = useState<number[]>([])

    useEffect(() => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get('/hobbie/getAll', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res => {
                setHobbies(res.data)
            })
        })
    }, [])

    const selectHobbie = (id: number) => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.post('/users/addHobbies', {
                hobbiesId: id
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                setSelectHobbies(prev => [...prev, id])
            })
        })
    }

    const removeHobbies = (id: number) => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.post('/users/removeHobbies', {
                hobbiesId: id
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                setSelectHobbies(prev => prev.filter(item => item !== id));
            })
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Выберите интересы</Text>

            <View style={styles.hobbiesList}>
                {hobbies.map(hobbie => 
                    selectHobbies.includes(hobbie.id) ? 
                    <TouchableOpacity onPress={() => removeHobbies(hobbie.id)}>
                        <Text style={styles.hobbieTextSelect}>{hobbie.title}</Text>    
                    </TouchableOpacity> 
                    : 
                    <TouchableOpacity onPress={() => selectHobbie(hobbie.id)}>
                        <Text style={styles.hobbieText}>{hobbie.title}</Text>    
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity onPress={onPrev}>
                    <View style={styles.buttonBack}>
                        <Text style={styles.buttonTitleBack}>Назад</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onNext}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonTitle}>Далее</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HobbiesTab

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - 125,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        gap: 32
    },
    title: {
        color: mainColor,
        fontSize: 24
    }, 
    hobbiesList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',

        gap: 8
    },
    hobbieText: {
        borderWidth: 1,
        borderColor: mainColor,
        paddingVertical: 2,
        paddingHorizontal: 8,

        borderRadius: 6
    },
    hobbieTextSelect: {
        borderWidth: 1,
        borderColor: mainColor,
        color: mainWhiteColor,
        backgroundColor: mainColor,
        paddingVertical: 2,
        paddingHorizontal: 8,

        borderRadius: 6,
        overflow: 'hidden'
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