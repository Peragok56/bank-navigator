// React / React-Native
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, TouchableWithoutFeedback } from "react-native"
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Styles
import { lineGradientColor, mainBlue, mainDarkBlue, mainDefaultWhite, mainGrayColor, mainOpacityDarkBlue, mainWhite } from "../../../styles/colorConst";
// Hooks
import { profileAction } from "../../../hooks/profileAction";
import { useTypedSelector } from "../../../hooks/userTypedSelector";
import { useNavigation } from "@react-navigation/native";
// Const
import { API_URL } from '../../../../variables.json'
// Gradient
import { LinearGradient } from 'expo-linear-gradient'
import UserBankServiceCard from "../../../components/UserBankServiceCard/UserBankServiceCard";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const Profile = () => {

    const navigation = useNavigation()

    const { fetchProfile } = profileAction()
    const {user, loading, error} = useTypedSelector(state => state.profile)

    useEffect(() => {
        fetchProfile()

        console.log(user?.icon);
    }, [])

    return(
        <View style={styles.container}>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>


                <View style={{position: 'relative'}}>
                <LinearGradient style={styles.gradient} colors={lineGradientColor}/>
                    {!user?.icon ? 
                        <Image source={require('../../../../assets/defaultAvatar.png')} style={styles.image}/> :
                        <Image source={{uri: `http://${API_URL}${user?.icon}`}} style={styles.image}/>
                    }

                    <View style={styles.buttonOptions}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileChange')}>
                            <Icons name="pencil" color={mainDefaultWhite} size={32}/>
                        </TouchableOpacity>
                    </View>

                </View>
                
                <View style={styles.infoBlock}>
                    <View style={styles.upInfoName}>
                        <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                            <Text style={styles.name}>{user.firstName}</Text>
                            <Text style={styles.job}>{user?.occupation}</Text>
                        </View>
                    </View>

                    <View style={styles.upInfoName}>
                        <Text style={styles.uppertext}>Номер телефона</Text>
                    </View>

                    <Text style={styles.textDescription}>{user.phoneNumber}</Text>
                    

                    <View style={styles.upInfoName}>
                        <Text style={styles.uppertext}>Почта</Text>
                    </View>

                    <Text style={styles.textDescription}>{user.email}</Text>
                </View>

                <View style={styles.dateContent}>
                        <View style={styles.line}/>
                            <Text style={styles.dateText}>Ваши заявки</Text>
                        <View style={styles.line}/>
                    </View>

                <View style={styles.workletList}>
                        {
                            user?.worklet?.map(worklet => 
                                <UserBankServiceCard 
                                    bank={worklet.Bank}
                                    nameService={worklet.nameService}
                                />    
                            )
                        }
                    </View>

                <View style={{width: '100%', height: 225}}/>
            </ScrollView>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: SCREEN_HEIGHT,
        backgroundColor: 'white',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: SCREEN_HEIGHT/1.7,
        position: 'relative',
    },
    buttonEdit: {
        width: 35,
        height: 35,
        backgroundColor: mainOpacityDarkBlue,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    upInfoName: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4
    },
    name: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600'
    },
    job: {
        color: '#09101D',
        fontSize: 16,
        fontWeight: '400'
    },
    labelUp: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
    },
    infoBlock: {
        width: '100%',
        display: 'flex',
        gap: 8,
        padding: 8,
        backgroundColor: 'white',
        top: -55,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 32
    },
    textWhite: {
        color: 'white'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    hobbiesList:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12
    },
    hobbie: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: mainBlue,
        borderRadius: 12,
        backgroundColor: mainBlue
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
    gradient: {
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: -10,
        zIndex: 1000,
        paddingHorizontal: 16,
        paddingVertical: 8,
        paddingTop: 275,
    },
    buttonOptions: {
        position: 'absolute',
        top: 48,
        right: 0,
        width: 55,
        height: 75,
        zIndex: 2000
    },
    dateContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 18,
        paddingHorizontal: 8
    },
    dateText: {
        fontWeight: '500',
        color: mainGrayColor,
        fontSize: 16,
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: mainGrayColor,
    },
    workletList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        paddingHorizontal: 8
    }  
})