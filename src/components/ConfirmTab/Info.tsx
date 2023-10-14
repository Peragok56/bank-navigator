// React / Reac - Native
import { FC, useState } from "react";
import { StyleSheet, View, Dimensions, Text, TextInput, TouchableOpacity } from "react-native";
// Types
import { IStepComponentProps } from "../../screens/auth/confirmScreen";
// Colors
import { mainColor, mainWhiteColor } from "../../styles/variables";
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Storage / Axios
import storage from "../../../storage";
import axios from "../../axios/axios";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen')

const InfoTab: FC<IStepComponentProps> = ({
    onNext,
    onPrev
}) => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [age, setAge] = useState<number>()
    const [description, setDescription] = useState<string>('')
    const [occupation, setOccupation] = useState<string>('')

    const saveChanges = () => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.patch('/users/update', {
                firstName: firstName,
                lastName: lastName,
                age: age,
                occupation: occupation,
                description: description
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res => {
                console.log(res.data);
                onNext()
            })
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Расскажите о себе</Text>

            <View style={styles.infoBlock}>

                <Text style={styles.inputTitle}>Имя</Text>
                <View style={styles.input}>
                    <TextInput 
                        style={{width: '93%', color: '#9B21C6'}}
                        placeholder={'Иван'}
                        onChangeText={e => setFirstName(e)}
                    />
                    <Icons name="pencil" size={18} color='#00000059'/>
                </View>

                <Text style={styles.inputTitle}>Фамилия</Text>
                <View style={styles.input}>
                    <TextInput 
                        style={{width: '93%', color: '#9B21C6'}}
                        placeholder={'Иванов'}
                        onChangeText={e => setLastName(e)}
                    />
                    <Icons name="pencil" size={18} color='#00000059'/>
                </View>

                <Text style={styles.inputTitle}>Род деятельности</Text>
                <View style={styles.input}>
                    <TextInput 
                        style={{width: '93%', color: '#9B21C6'}}
                        placeholder={'Стилист'}
                        onChangeText={e => setOccupation(e)}
                    />
                    <Icons name="pencil" size={18} color='#00000059'/>
                </View>

                <Text style={styles.inputTitle}>Возраст</Text>
                <View style={styles.input}>
                    <TextInput 
                        style={{width: '93%', color: '#9B21C6'}}
                        placeholder={'18'}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={e => setAge(parseInt(e))}
                    />
                    <Icons name="pencil" size={18} color='#00000059'/>
                </View>

                <Text style={styles.inputTitle}>Описание</Text>
                <View style={styles.input}>
                    <TextInput 
                        style={{width: '93%', color: '#9B21C6', height: 255}}
                        multiline
                        placeholder={'Опишите себя'}
                        onChangeText={e => setDescription(e)}
                    />
                    <Icons name="pencil" size={18} color='#00000059'/>
                </View>

            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity onPress={onPrev}>
                    <View style={styles.buttonBack}>
                        <Text style={styles.buttonTitleBack}>Назад</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveChanges}
                    disabled={firstName === '' && true}
                >
                    <View style={[styles.button, {opacity: firstName === '' ? .3 : 1}]}>
                        <Text style={styles.buttonTitle}>Далее</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InfoTab

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 32
    },
    title: {
        fontSize: 24,
        color: mainColor
    },
    infoBlock: {
        width: '80%'
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 16,
        borderColor: '#00000059',
        paddingVertical: 8,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
        marginBottom: 6
    },
    inputTitle: {
        color: '#9B21C6',
        fontWeight: '400',
        fontSize: 14
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