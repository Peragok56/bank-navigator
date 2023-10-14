// React / React-Native
import { FC, memo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
// Types
import { IBankCard } from "./BankCard.type";
// Styles
import { mainBlue, mainDarkBlue, mainDefaultWhite, mainGray, mainWhite } from "../../styles/colorConst";
// Variables
import { API_URL } from '../../../variables.json'

const BankCard: FC<IBankCard> = ({
    name,
    image,
    address,
    employment
}) => {
    return(
        <View style={styles.container}>

            {
                image ? 
                    <Image source={{uri: `http://${API_URL}${image}`}} style={styles.image}/> 
                : 
                    <View style={styles.nonImage}/>
            }
            
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>

                <Text style={styles.address}>{address}</Text>
            </View>

        </View>
    )
}

export default memo(BankCard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainDefaultWhite,
        borderRadius: 12,

        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: mainDarkBlue
    },
    address: {
        color: mainGray,
        marginTop: 8,
        fontSize: 12
    },
    info: {
        padding: 8,
    },
    image: {
        width: '100%',
        height: 154,
        backgroundColor: mainBlue,
        borderRadius: 12
    },
    nonImage: {
        width: '100%',
        height: 256,
        backgroundColor: mainBlue,
        borderRadius: 12
    }
})