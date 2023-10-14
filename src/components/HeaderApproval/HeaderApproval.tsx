// React / React Native
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { mainDefaultWhite } from "../../styles/colorConst";

const HeaderApproval = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.uppertext}>Пройдите тест</Text>
            <Text style={styles.textDescription}>И узнайте свой процент одобряемости кредита</Text>
        </View>
    )
}

export default HeaderApproval

const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 6,
        backgroundColor: mainDefaultWhite,
        marginBottom: 12,
        borderRadius: 6
    },
    uppertext: {
        color: '#09101D',
        fontSize: 20,
        fontWeight: '600',
    },
    textDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 8
    },
})

