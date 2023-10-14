// React / React-Native
import { FC, memo} from "react";
import { StyleSheet, Text, View } from "react-native";
// Types
import { IServiceFilterCard } from "./ServiceFilterCard.type";
// Styles
import { mainDarkBlue, mainDefaultWhite } from "../../../../styles/colorConst";

const ServiceFilterCard: FC<IServiceFilterCard> = ({
    name,
    select
}) => {
    return(
        <View style={!select ? styles.container : [styles.container, {backgroundColor: mainDarkBlue}]}>
            <Text style={!select ? styles.text : [styles.text, {color: mainDefaultWhite}]}>{name}</Text>
        </View>
    )
}

export default memo(ServiceFilterCard)

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: mainDarkBlue,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: mainDarkBlue
    }
})