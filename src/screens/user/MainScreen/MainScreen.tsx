// React / React - Native
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
// Components
import HeaderApproval from "../../../components/HeaderApproval/HeaderApproval";
// Consts
import BankCard from "../../../components/BankCard/BankCard";
// Storage / Axios
import storage from "../../../../storage";
import axios from "../../../axios/axios";

const MainScreen = ({navigation}: any) => {

    const [banks, setBanks] = useState<any>([])

    useEffect(() => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get('/bank/findAll', {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res => {
                console.log(res.data);
                setBanks(res.data)
            })
        })
    }, [])
    

    return(
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate('Approval')}>
                <HeaderApproval />
            </TouchableOpacity>

            <View style={styles.scrollContainer}>
                {banks.map(bank => 
                    <TouchableOpacity style={{width: '47%'}} onPress={() => navigation.navigate('ViewBank', { bankId : bank.id})}>
                        <BankCard 
                            name={bank.name}
                            address={bank.address}
                            image={bank.icon}
                        />    
                    </TouchableOpacity>
                )}
            </View>

            <View style={{width: '100%', height: 274}}/>

        </ScrollView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 8,
    },
    scrollContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
    }
})