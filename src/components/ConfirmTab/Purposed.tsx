// React / React-Native
import { FC, useContext, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Platform } from "react-native";
// Context
import { Context } from "../../../context";
// Types
import { IStepComponentProps } from "../../screens/auth/confirmScreen";
// Colors
import { mainColor, mainWhiteColor } from "../../styles/variables";
// Expo
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

const PurposedTabs: FC<IStepComponentProps> = ({
    onNext,
    onPrev
}) => {

    const context = useContext(Context)

    const [purposed, setPurposed] = useState<string>('')

    async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
      }

      const saveChanges = async () => {

        let pushToken = await registerForPushNotificationsAsync()
        
        await context?.saveUserUpdate(purposed, pushToken)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Выберите цель знакомтсва</Text>

            <View style={styles.info}>
                {purposed === 'friendly_relations' ? 
                    <View style={styles.selectCard}>
                        <Text style={styles.selectedtitle}>Дружеское общение</Text>
                    </View> :
                    <TouchableOpacity onPress={() => setPurposed('friendly_relations')}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Дружеское общение</Text>
                        </View>
                    </TouchableOpacity>
                }

                {purposed === 'serios_relationship' ? 
                    <View style={styles.selectCard}>
                        <Text style={styles.selectedtitle}>Cерьезные отношения</Text>
                    </View> :
                    <TouchableOpacity onPress={() => setPurposed('serios_relationship')}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Cерьезные отношения</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity onPress={onPrev}>
                    <View style={styles.buttonBack}>
                        <Text style={styles.buttonTitleBack}>Назад</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveChanges}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonTitle}>Завершить</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default PurposedTabs

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - 125,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32
    },
    title: {
        color: mainColor,
        fontSize: 24
    },
    info: {
        display: 'flex',
        gap: 8
    },
    selectCard: {
        borderWidth: 1,
        borderColor: mainColor,
        backgroundColor: mainColor,
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    card: {
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    cardTitle: {
        color: mainColor,
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    selectedtitle:{ 
        color: mainWhiteColor,
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    buttonView: {
        paddingHorizontal: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: mainColor,
        borderWidth: 2,
        borderColor: mainColor,
        paddingVertical: 8,
        paddingHorizontal: 48,
        borderRadius: 12,
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBack: {
        borderColor: mainColor,
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 48,
        borderRadius: 12,
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: mainWhiteColor,
        fontSize: 18,
    },
    buttonTitleBack: {
        color: mainColor,
        fontSize: 18,
    }
})