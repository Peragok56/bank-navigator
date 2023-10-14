// React / React-Native
import { FC, memo, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
// Components
import BottomSheet from "../BottomSheet/BottomSheet";
// types
import { IBottomSheetReviewCreate } from "./BottomSheetReviewCreate.type";
// Styles
import { mainBlue, mainWhite } from "../../styles/colorConst";
// PickerSelect
import RNPickerSelect from 'react-native-picker-select'
// Storage / Axios
import storage from "../../../storage";
import axios from "../../axios/axios";

const BottomSheetReviewCreate: FC<IBottomSheetReviewCreate> = ({
    closeModal,
    opened,
    bankId
}) => {

    const [reviewText, setReviewText] = useState<string>('')
    const [marks, setMarks] = useState<any[]>([{name: '1', id: '1'}, {name: '2', id: '2'}, {name: '3', id: '3'}, {name: '4', id: '4'}, {name: '5', id: '5'}])
    const [selectMark, setSelectMark] = useState<any>()

    const createReview = () => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.post('/review/create', {
                bankId: bankId,
                text: reviewText,
                mark: selectMark,
            }, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
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
                closeModal?.()
            })
        })
    }
    

    return(
        <BottomSheet
            closeModal={closeModal}
            opened={opened}
        >
            <View style={styles.container}>
                <Text style={styles.uppertext}>Оставьте отзыв</Text>

                <Text style={styles.textDescription}>Если вы уже были в этом отделение банка, то расскажите об этом, это будет полезно другим пользователям</Text>

                <View style={styles.reviewBlock}>
                    <TextInput 
                        style={styles.input}
                        value={reviewText}
                        onChangeText={e => setReviewText(e)}
                    />

                <RNPickerSelect 
                    style={pickerSelectStyles}
                    placeholder={{
                        label: ''
                    }}
                    onValueChange={(value: any) => setSelectMark(value)}
                    items={marks.map(service => {
                        return (
                            { label: service.name, value: service.id }
                        )
                    })}
                /> 

                </View>

                <TouchableOpacity onPress={createReview}> 
                    <View style={styles.buttonSend}>
                        <Text style={styles.buttonSendText}>Отправить</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </BottomSheet>
    )
}

export default memo(BottomSheetReviewCreate)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    uppertext: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    textDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 16
    },
    reviewBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8
    },
    input: {
        marginTop: 16,
        width: '85%',
        borderWidth: 1,
        borderColor: mainBlue,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6
    },
    buttonSend: {
        marginTop: 24,
        width: '100%',
        backgroundColor: mainBlue,
        borderRadius: 6,
        paddingVertical: 8
    },
    buttonSendText: {
        color: mainWhite,
        fontSize: 16,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center'
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      width: 42,
      fontSize: 16,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: mainBlue,
      color: mainBlue,
      marginTop: 12,
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