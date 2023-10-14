// React / React-Native
import React, { FC, memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
// Types
import { IUserBankServiceCard } from "./UserBankServiceCard.type";
// Styles
import { mainBlue, mainGray } from "../../styles/colorConst";
// Variables
import {  API_URL } from '../../../variables.json'

const UserBankServiceCard: FC<IUserBankServiceCard> = ({
    bank,
    nameService
}) => {
    return(
        <View style={styles.container}>

            <View style={styles.bankContainer}>
                    {!bank?.icon ? 
                        <Image source={require('../../../assets/defaultAvatar.png')} style={styles.image}/> :
                        <Image source={{uri: `http://${API_URL}${bank?.icon}`}} style={styles.image}/>
                    }

                    <View style={styles.bankInfo}>
                        <Text style={styles.uppertext}>{bank?.name}</Text>
                        <Text style={styles.textDescription}>{bank?.phoneNumber}</Text>
                        <Text style={styles.textDescription}>{bank?.address}</Text>
                    </View>
            </View>

            <View style={styles.requestInfo}>
                <Text style={styles.textDescription}>Причина обращения</Text>
                <Text style={styles.uppertext}>{nameService}</Text>
            </View>

        </View>
    )
}

export default memo(UserBankServiceCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: mainGray,
        padding: 6
    },
    bankContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        borderBottomWidth: 1,
        paddingBottom: 6,
        borderBottomColor: mainGray
    },
    image: {
        width: 124,
        height: 124,
        borderRadius: 12,
        backgroundColor: mainBlue
    },
    bankInfo:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
    requestInfo: {
        paddingVertical: 6
    }
})