// React / React Native
import { FC, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity } from "react-native";
// Types
import { IStepComponentProps } from "../../screens/auth/confirmScreen";
// Axios / Storage
import axios from "../../axios/axios";
import storage from "../../../storage";
// Slider
import MultiSlider from '@ptomasroos/react-native-multi-slider'
// Color
import { mainColor, mainWhiteColor } from "../../styles/variables";
// PickerSelect
import RNPickerSelect from 'react-native-picker-select'

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const Height: FC<IStepComponentProps> = ({
    onNext,
    onPrev
}) => {

    const [cities, setCities] = useState<any[]>([])
    const [selectCity, setSelectCity] = useState<any>(null)
    const [height, setHeight] = useState<any>(120)
    const [weight, setWeight] = useState<any>(30)

    useEffect(() => {
        axios.get('/city/findAll')
        .then(res => {
            setCities(res.data)
        })
    }, [])

    const saveChanges = () => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.patch('/users/update', {
                height: Number(height),
                weight: Number(weight),
                cityId: selectCity
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
        <View style={styles.container}>
            <Text style={styles.title}>Заполните все поля</Text>

            <View style={styles.info}>
                
                <View style={styles.option}>
                    
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>Ваш рост: </Text>
                        <Text style={styles.optionText}>{height}</Text>
                    </View>

                    <MultiSlider 
                        values={[height]}
                        min={120}
                        max={221}
                        step={1}
                        sliderLength={SCREEN_WIDTH / 1.3}
                        onValuesChange={e => setHeight(e)}
                    />
                </View>

                <View style={styles.option}>
                    
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>Ваш вес: </Text>
                        <Text style={styles.optionText}>{weight}</Text>
                    </View>

                    <MultiSlider 
                        values={[weight]}
                        min={30}
                        max={181}
                        step={1}
                        sliderLength={SCREEN_WIDTH / 1.3}
                        onValuesChange={e => setWeight(e)}
                    />
                </View>

                <View style={styles.option}>
                    
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionText}>Выберите город</Text>
                    </View>

                    <RNPickerSelect 
                        style={pickerSelectStyles}
                        onValueChange={(value: any) => setSelectCity(value)}
                        items={cities.map(item => {
                            return (
                                { label: item.city, value: item.id }
                            )
                        })}
                    />                
                </View>

            

            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity onPress={onPrev}>
                    <View style={styles.buttonBack}>
                        <Text style={styles.buttonTitleBack}>Назад</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveChanges}
                    disabled={selectCity === null ? true : false}
                >
                    <View style={[styles.button, {opacity: selectCity === null ? .3 : 1}]}>
                        <Text style={styles.buttonTitle}>Далее</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Height

const styles = StyleSheet.create({
    container: {    
        height: SCREEN_HEIGHT - 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        gap: 32,
        position: 'relative'
    },
    title: {
        color: mainColor,
        fontSize: 24,
    },
    info: {
        width: '80%',
        display: 'flex',
    },
    option: {
        width: '100%',

    },
    optionText: {
        color: mainColor,
        fontSize: 16,
        fontWeight: '500',
    },
    optionContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: mainColor,
      color: mainColor,
      marginTop: 6,
      marginBottom: 6
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  });