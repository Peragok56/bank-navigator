// React / React-Native
import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
// Components
import BankService from "../../../components/BankService/BankService";
// Storage / Axios
import storage from "../../../../storage";
import axios from "../../../axios/axios";
// Const 
import { API_URL } from '../../../../variables.json'
// Styles
import { lineGradientColor, mainBlue, mainDarkBlue, mainDefaultWhite, mainGray, mainOpacityDarkBlue, mainWhite } from "../../../styles/colorConst";
// Gradient
import { LinearGradient } from "expo-linear-gradient";
import BottomSheetBankRequest from "../../../components/BottomSheetBankRequest/BottomSheetBankRequest";
import BottomSheetReviewCreate from "../../../components/BottomSheetReviewCreate/BottomSheetReviewCreate";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const ViewBank = (props: any) => {

    const [bank, setBank] = useState<any>()
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const [bankRequest, setBankRequest] = useState<boolean>(false)
    const [bankReview, setBankReview] = useState<boolean>(false)

    const switchVisibility = useCallback(() => {
        setBankRequest(prev => !prev)
    }, [])

    const switchVisibilityReview = useCallback(() => {
        setBankReview(prev => !prev)
    }, [])


    useEffect(() => {
        storage.load({
            key: 'token'
        })
        .then(res => {
            axios.get(`/bank/findOne/${props.route.params.bankId}`, {headers: {Authorization: `Bearer ${res.accessToken}`}})
            .then(res2 => {
                setBank(res2.data)
                axios.get(`/review/getBankReviews/${props.route.params.bankId}`, {headers: {Authorization: `Bearer ${res.accessToken}`}})
                .then(res3 => {
                    setReviews(res3.data)
                    setLoading(true)
                })

            })
        })
    }, [])

    return(
        <View style={styles.container}>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>


                <View style={{position: 'relative'}}>
                <LinearGradient style={styles.gradient} colors={lineGradientColor}/>
                    {!bank?.icon ? 
                        <Image source={require('../../../../assets/defaultAvatar.png')} style={styles.image}/> :
                        <Image source={{uri: `http://${API_URL}${bank?.icon}`}} style={styles.image}/>
                    }

                </View>
                
                <View style={styles.infoBlock}>
                    <View style={styles.upInfoName}>
                        <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                            <Text style={styles.name}>{bank?.name}</Text>
                        </View>
                    </View>

                    <View style={styles.upInfoName}>
                        <Text style={styles.uppertext}>Номер телефона</Text>
                    </View>

                    <Text style={styles.textDescription}>{bank?.phoneNumber}</Text>
                    
                    <View style={styles.upInfoName}>
                        <Text style={styles.uppertext}>Услуги банка</Text>
                    </View>

                    {

                        bank?.Service.length === 0 ? 
                            <Text style={styles.textDescription}>Банк пока не предоставляет услуг</Text>
                        :
                        <View style={styles.servicesBlock}>
                            {
                                bank?.Service.map(service => 
                                    <BankService 
                                        name={service.name}
                                    />    
                                )
                            }
                        </View>
                    }

                    <TouchableOpacity style={{marginTop: 32}} onPress={switchVisibility}>
                        <View style={styles.buttonSend}>
                            <Text style={{color: mainDefaultWhite, fontSize: 16, fontWeight: '500'}}>Оставить обращение</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.reviewblock}>
                        <Text style={styles.textDescription}>Уже были здесь?</Text>
                        <TouchableOpacity onPress={switchVisibilityReview}>
                            <Text style={[styles.textDescription, {color: mainBlue}]}>Оставить отзыв</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.reviewsList}>
                        <Text style={[styles.uppertext, {marginBottom: 8}]}>Последние отзывы</Text>
                        {
                            reviews.length > 0 &&
                            reviews.map(review => 
                                <View style={styles.reviewCard}>
                                    <Text style={[styles.uppertext, {borderBottomColor: mainGray, borderBottomWidth: 1}]}>{review.user.firstName}</Text>
                                    <Text style={styles.textDescription}>{review.text}</Text>
                                </View>    
                            )
                        }

                    </View>
                    
                </View>

                <View style={{width: '100%', height: 225}}/>
            </ScrollView>

            <BottomSheetBankRequest 
                opened={bankRequest}
                closeModal={switchVisibility}
                bankId={props.route.params.bankId}
            />

            <BottomSheetReviewCreate 
                opened={bankReview}
                closeModal={switchVisibilityReview}
                bankId={props.route.params.bankId}
            />

        </View>
    )
}

export default ViewBank

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
    servicesBlock: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    buttonSend: {
        width: '100%',
        backgroundColor: mainBlue,
        padding: 8,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reviewblock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    reviewsList: {
        width: '100%',
        marginTop: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
    },
    reviewCard: {
        width: '100%',
        padding: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: mainGray
    }
})