// React / React-Native
import { FC, memo, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Components
import BottomSheet from "../BottomSheet/BottomSheet";
// Types
import { IBottomSheetBankFilter } from "./BottomSheetBankFilter.type";
// Storage / Axios
import storage from "../../../storage";
import axios from "../../axios/axios";
import ServiceFilterCard from "./localComponents/ServiceFilterCard/ServiceFilterCard";
// Styles
import { mainBlue, mainDefaultWhite } from "../../styles/colorConst";

const BottomSheetBankFilter: FC<IBottomSheetBankFilter> = ({
    closeModal,
    saveFilter,
    opened
}) => {

    const [services, setServices] = useState<any[]>([])

    const [selectServiceIds, setSelectServiceIds] = useState<number[]>([])

    useEffect(() => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get('/services-bank/findAll', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                setServices(res2.data)
            })
        })
    }, [opened])

    const addSelectServices = (id: number): void => {
        if (selectServiceIds.some(haveId => haveId === id)) setSelectServiceIds(selectServiceIds.filter(haveId => haveId !== id));
        else setSelectServiceIds([...selectServiceIds, id])
    };

    const onSaveFilter = () => {
        saveFilter?.(selectServiceIds)
        closeModal?.()
    }

    return(
        <BottomSheet
            opened={opened}
            closeModal={closeModal}
        >
            
            <View style={styles.container}>
                <Text style={styles.uppertext}>Фильтрация</Text>

                <View style={styles.mainFilterCategory}>
                    {
                        services.map(service => 
                         <TouchableOpacity onPress={() => addSelectServices(service.id)}>
                            <ServiceFilterCard 
                                name={service.name}
                                select={selectServiceIds.some(id => id === service.id)}
                            />   
                         </TouchableOpacity>
                        )
                    }
                </View>

                <TouchableOpacity style={{marginTop: 24, width: '50%'}} onPress={onSaveFilter}>
                    <View style={styles.buttonSuccess}>
                        <Text style={styles.buttonSuccessText}>Применить</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </BottomSheet>
    )
}

export default memo(BottomSheetBankFilter)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 4,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    uppertext: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600',
    },
    textDescription: {
        fontSize: 14,
        color: 'gray'
    },
    mainFilterCategory: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 16
    },
    buttonSuccess: {
        backgroundColor: mainBlue,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    buttonSuccessText: {
        color: mainDefaultWhite,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600'
    }
})