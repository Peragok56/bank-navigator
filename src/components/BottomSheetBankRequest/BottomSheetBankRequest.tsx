// React / React-Native
import { FC, memo, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
// Components
import BottomSheet from "../BottomSheet/BottomSheet";
// Type
import { IBottomSheetBankRequest } from "./BottomSheetBankRequest.type";
// Styles
import { mainBlue, mainDarkBlue, mainDefaultWhite } from "../../styles/colorConst";
import storage from "../../../storage";
import axios from "../../axios/axios";
// PickerSelect
import RNPickerSelect from 'react-native-picker-select'
// Hooks
import { profileAction } from "../../hooks/profileAction";

const BottomSheetBankRequest:FC <IBottomSheetBankRequest> = ({
    closeModal,
    opened,
    bankId,
}) => {

    const [services, setServices] = useState<any[]>([])
    const [selectService, setSelectservice] = useState<number>()

    const {setNewInfoForProfile} = profileAction()
    const { fetchProfile } = profileAction()

    useEffect(() => {
        fetchProfile()

        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get(`/bank/findOne/${bankId}`, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                setServices(res2.data.Service)
            })
        })
    }, [])

    const sendBankRequest = () => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.post('/bank-workload/create', {
                bankId: bankId,
                serviceId: selectService
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${res.accessToken}`}})
                .then(res3 => {
                    setNewInfoForProfile(res3.data)
                    closeModal?.()
                    Alert.alert(
                        "Отлично",
                        `Ваше обращение успешно отправленно`,
                        [
                            {
                            text: `Понятно`,
                            style: "cancel",
                            },
                        ],
                    );
                })
            })
        })
    }
    

    return(
        <BottomSheet
            closeModal={closeModal}
            opened={opened}
        >
            <View style={styles.container}>
                <Text style={styles.uppertext}>Оставить обращение</Text>

                <Text style={styles.textDescription}>Выберите из списка категорию, по которой вы хотите обратится в данный банк</Text>

                <RNPickerSelect 
                    style={pickerSelectStyles}
                    onValueChange={(value: any) => setSelectservice(value)}
                    items={services.map(service => {
                        return (
                            { label: service.name, value: service.id }
                        )
                    })}
                />       

                <TouchableOpacity style={{marginTop: 16}} onPress={sendBankRequest}>
                    <View style={styles.buttonSend}>
                        <Text style={{color: mainDefaultWhite, fontSize: 16, fontWeight: '600'}}>Оставить обращение</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </BottomSheet>
    )
}

export default memo(BottomSheetBankRequest)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 8,
    },
    uppertext: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center'
    },
    textDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 16,
        marginBottom: 16
    },
    buttonSend: {
        width: '100%',
        backgroundColor: mainBlue,
        padding: 6,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: mainBlue,
      color: mainBlue,
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