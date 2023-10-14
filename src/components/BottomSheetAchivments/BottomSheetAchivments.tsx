// React / React-Native
import { FC, memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Components
import BottomSheet from "../BottomSheet/BottomSheet";
// Types
import { IBottomSheetAchivments } from "./BottomSheetAchivments.type";
// Styles
import { mainBlue, mainDefaultWhite } from "../../styles/colorConst";
// Hooks
import { useNavigation } from "@react-navigation/native";

const BottomSheetAchivments: FC<IBottomSheetAchivments> = ({
    closeModal,
    opened
}) => {

    const navigation = useNavigation()

    const moveTo = () => {
        closeModal?.()
        navigation.navigate('Medal')
    }

    return(
        <BottomSheet
            closeModal={closeModal}
            opened={opened}
        >

            <View style={styles.container}>

                <Text style={styles.uppertext}>Достижения</Text>


                <Image source={require('../../../assets/medal/blueMedal.png')} style={styles.image}/>

                <Text style={styles.textDescription}>
                    Посещайте отделения банков и сканируйте QR-коды что бы собрать части достижений и при сборе нужно количества - получить полноценные достижения
                </Text>

                <TouchableOpacity onPress={moveTo}>
                    <View style={styles.buttonMove}>
                        <Text style={styles.buttonMoveText}>Узнать больше</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </BottomSheet>
    )
}

export default memo(BottomSheetAchivments)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 12
    },
    uppertext: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16
    },
    textDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 16,
        marginBottom: 16
    },
    image: {
        width: 175,
        height: 175
    },
    buttonMove: {
        width: '100%',
        padding: 6,
        backgroundColor: mainBlue,
        borderRadius: 6,
        paddingHorizontal: 24
    },
    buttonMoveText: {
        color: mainDefaultWhite,
        fontSize: 16,
        fontWeight: '500'
    }
})