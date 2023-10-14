// React / React-Native
import { FC, memo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// Styles
import { mainBlue, mainDarkBlue, mainGray } from "../../../styles/colorConst";

const Medal = () => {

    return(
        <View style={styles.container}>

            <ScrollView style={styles.scrollConatiner} showsVerticalScrollIndicator={false}>

                <View style={styles.achivmentsBlock}>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.achivmentsCardTitle}>Отсканированно QR-кодов</Text>

                        <Text style={styles.achivmentsCardTitle}>0/20</Text>
                    </View>

                    <View style={styles.achivmentsCard}>
                        <Image source={require('../../../../assets/medal/blueMedal.png')} style={[styles.achivmentsCardImage, {backgroundColor: mainBlue}]}/>
                        
                        <View style={styles.achivmentsCardInfo}>
                            <Text style={styles.achivmentsCardTitle}>Синяя медаль</Text>
                            <Text style={styles.achivmentsCardDescription}>
                                Данная медаль дается за вход в мобильное приложение.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.achivmentsCard, {opacity: .5}]}>
                        <Image source={require('../../../../assets/medal/bronzeMedal.png')} style={[styles.achivmentsCardImage, {backgroundColor: '#B08D57'}]}/>
                        
                        <View style={styles.achivmentsCardInfo}>
                            <Text style={styles.achivmentsCardTitle}>Бронзовая медаль</Text>
                            <Text style={styles.achivmentsCardDescription}>
                                Отсканируйте QR-код в любом отделения банка и получите эту медаль
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.achivmentsCard, {opacity: .5}]}>
                        <Image source={require('../../../../assets/medal/silverMedal.png')} style={[styles.achivmentsCardImage, {backgroundColor: '#C0C0C0'}]}/>
                        
                        <View style={styles.achivmentsCardInfo}>
                            <Text style={styles.achivmentsCardTitle}>Серебренная медаль</Text>
                            <Text style={styles.achivmentsCardDescription}>
                                Отсканируйте QR-коды в 5 разных отделениях банков и получите эту медаль
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.achivmentsCard, {opacity: .5}]}>
                        <Image source={require('../../../../assets/medal/GoldMedal.png')} style={[styles.achivmentsCardImage, {backgroundColor: '#D4AF37'}]}/>
                        
                        <View style={styles.achivmentsCardInfo}>
                            <Text style={styles.achivmentsCardTitle}>Золотая медаль</Text>
                            <Text style={styles.achivmentsCardDescription}>
                                Отсканируйте QR-коды в 10 разных отделениях банков и получите эту медаль
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.achivmentsCard, {opacity: .5}]}>
                        <Image source={require('../../../../assets/medal/BlackMedal.png')} style={[styles.achivmentsCardImage, {backgroundColor: 'black'}]}/>
                        
                        <View style={styles.achivmentsCardInfo}>
                            <Text style={styles.achivmentsCardTitle}>Черная медаль</Text>
                            <Text style={styles.achivmentsCardDescription}>
                                Отсканируйте QR-коды в 20 разных отделениях банков и получите эту медаль
                            </Text>
                        </View>
                    </View>

                    <View style={{width: '100%', height: 274}}/>

                </View>
        
            </ScrollView>

        </View>
    )
}

export default Medal

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 8,
        marginTop: 24
    },
    scrollConatiner: {

    },
    achivmentsBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    achivmentsCard: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start'
    },
    achivmentsCardImage: {
        width: 124,
        height: 124,
        borderRadius: 8
    },
    achivmentsCardInfo: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    achivmentsCardTitle: {
        color: mainDarkBlue,
        fontSize: 18,
        fontWeight: '600'
    },
    achivmentsCardDescription:{
        color: mainGray,
        fontSize: 14,
        fontWeight: '400'
    }
})