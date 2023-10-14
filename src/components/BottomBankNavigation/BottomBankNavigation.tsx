// React / React-Native
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// Types
import { IBottomBankNavigation } from './BottomBankNavigation.type'
// Components
import BottomSheet from "../BottomSheet/BottomSheet";
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Styles
import { mainBlue, mainWhite } from "../../styles/colorConst";
// Variables
import { API_URL } from '../../../variables.json'

const BottomBankNavigation: FC<IBottomBankNavigation> = ({
    opened,
    closeModal,
    changeRoute,
    bank,
    workload
}) => {

    const onCahngeRoutePedestrian = () => {
        changeRoute?.('pedestrian')
        closeModal?.()
    }

    const onCahngeRouteCar = () => {
        changeRoute?.('taxi')
        closeModal?.()
    }
    const onCahngeRouteBus = () => {
        changeRoute?.('bus')
        closeModal?.()
    }

    const onCahngeRouteBike = () => {
        changeRoute?.('bicycle')
        closeModal?.()
    }

    return(
        <BottomSheet
            opened={opened}
            closeModal={closeModal}
        >


            <View style={styles.container}>
                <Image source={{uri: `http://${API_URL}${bank?.bank?.icon}`}} style={styles.image}/>

                <Text style={styles.uppertext}>{bank?.bank?.name}</Text>
                <Text style={styles.textDescription}>{bank?.bank?.phoneNumber}</Text>
                <Text style={styles.textDescription}>{bank?.bank?.address}</Text>

                {
                    workload &&
                    workload.map(workload => console.log(workload))
                }

                <View style={styles.buttonList}>
                    <TouchableOpacity onPress={onCahngeRoutePedestrian} style={{width: '47%'}}>
                        <View style={styles.buttonNavigate}>
                            <Icons name="walk" size={32} color={mainWhite}/>
                            <Text style={styles.buttonText}>В путь</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onCahngeRouteCar} style={{width: '47%'}}>
                        <View style={styles.buttonNavigate}>
                            <Icons name="car" size={32} color={mainWhite}/>
                            <Text style={styles.buttonText}>В путь</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onCahngeRouteBus} style={{width: '47%'}}>
                        <View style={styles.buttonNavigate}>
                            <Icons name="bus" size={32} color={mainWhite}/>
                            <Text style={styles.buttonText}>В путь</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onCahngeRouteBike} style={{width: '47%'}}>
                        <View style={styles.buttonNavigate}>
                            <Icons name="bike" size={32} color={mainWhite}/>
                            <Text style={styles.buttonText}>В путь</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        </BottomSheet>
    )
}

export default BottomBankNavigation

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginTop: 25,
    },
    name: {
        color: mainBlue,
        fontSize: 18
    },
    buttonList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
        marginBottom: 12
    },
    buttonNavigate: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,

        backgroundColor: mainBlue,
        width: '100%',

        paddingVertical: 4,
        paddingHorizontal: 8,

        borderRadius: 12
    },
    buttonText: {
        color: mainWhite,
        fontSize: 16,
        fontWeight: '600'
    },
    image: {
        width: '100%',
        height: 156,
        borderRadius: 12
    },
    uppertext: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 8
    },
    textDescription: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 4
    },
})