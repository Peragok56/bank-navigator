// React / React - Native
import { FC, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
// Styles
import { mainDarkBlue, mainDefaultWhite, mainOpacityLightBlue, mainWhite } from "../../styles/colorConst";
// Type
import { IBankService } from "./BankService.type";

const BankService: FC<IBankService> = ({
    name
}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

export default memo(BankService)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: mainDarkBlue,

        borderRadius: 8
    },
    text: {
        color: mainDefaultWhite,
        fontSize: 16,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center'
    }
})