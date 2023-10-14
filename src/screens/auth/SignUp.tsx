// React / React-Native
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
// Hook-form
import { Controller, useForm } from "react-hook-form";
// Styles
import { mainBlue, mainDarkBlue, mainOpacityDarkBlue, mainOpacityLightBlue, mainOpacityWhite, mainWhite } from "../../styles/colorConst";
// Context
import { Context } from "../../../context";

const SignUp = ({navigation}: any) => {

    const context = useContext(Context)

    const [phoneNumberm, setPhoneNumber] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    type FormValues = {
        phoneNumber: string,
        email: string,
        password: string,
    }

    const form = useForm<FormValues>()

    const { 
        register, 
        handleSubmit, 
        control, 
        formState } = form

    const onSubmit = (data: FormValues) => {
        context.signUp(data)
    }

    return(
        <View style={styles.container}>

            <Text style={styles.label}>Регистрация</Text>

            <View style={styles.authBlock}>
                <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{required: '* Номер телефона обязателен'}}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <>
                            <Text style={styles.inputTitle}>Номер телефона</Text>
                            <TextInput
                                placeholder="88008008080" 
                                id="phoneNumber"
                                {...register("phoneNumber")}
                                keyboardType={'number-pad'}
                                onChangeText={value => {
                                    onChange(value)
                                    setPhoneNumber(value)
                                }}
                                maxLength={11}
                                style={styles.input}
                            />
                            {error && (
                                <View style={styles.errorBackground}>
                                    <Text style={styles.error}>{error?.message}</Text>
                                </View>
                            )}
                        </>
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    rules={{required: '* Почта обезательна'}}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <>
                            <Text style={styles.inputTitle}>Почта</Text>
                            <TextInput
                                placeholder="test@mail.ru" 
                                id="email"
                                {...register("email")}
                                onChangeText={value => {
                                    onChange(value)
                                    setEmail(value)
                                }}
                                style={styles.input}
                            />
                            {error && (
                                <View style={styles.errorBackground}>
                                    <Text style={styles.error}>{error?.message}</Text>
                                </View>
                            )}
                        </>
                    )}
                />

                <Controller 
                    name='password'
                    control={control}
                    rules={{required: "* Пароль обязателен"}}
                    render={({field: {onChange, onBlur, value}, fieldState: {error, invalid}}) => (
                        <>
                            <Text style={styles.inputTitle}>Пароль</Text>
                            <TextInput 
                                placeholder="******" 
                                id="password"
                                onChangeText={value => {
                                    onChange(value)
                                    setPassword(value)
                                }}
                                {...register("password")}
                                style={styles.input}
                                value={value}
                                secureTextEntry={true}
                            />
                            {error && (
                                <View style={styles.errorBackground}>
                                    <Text style={styles.error}>{error?.message}</Text>
                                </View>
                            )}
                        </>
                    )}
                />

                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <View style={styles.buttonAuth}>
                        <Text style={styles.buttonText}>Зарегистрироваться</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.downHelp}>
                    <Text style={styles.downHelpText}>Уже есть аккаунт?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('authorization')}>
                        <Text style={styles.donwHelpButton}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: mainWhite,
  
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }, 
    label: {
      color: mainDarkBlue,
      fontWeight: '500',
      fontSize: 28,
      marginBottom: 24
    },
    authBlock: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
    },
    upperText: {
      color: mainBlue,
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      paddingHorizontal: 8,
      borderRadius: 6,
      borderColor: '#00000059',
      paddingVertical: 8,
      width: '100%',
      color: mainBlue,
      marginBottom: 8
  },
  inputTitle: {
      color: mainBlue,
      fontWeight: '400',
      marginBottom: 8
  },
    buttonAuth: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  
      backgroundColor: mainDarkBlue,
      paddingVertical: 6,
      borderRadius: 6,
    },
    buttonText: {
      color: mainWhite,
      fontWeight: '600'
    },
    errorBackground: {
      backgroundColor: mainOpacityLightBlue,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 20,
      marginBottom: 12
    },
    error: {
      color: mainDarkBlue,
      fontSize: 14
    },
    downHelp: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    downHelpText: {
        color: mainDarkBlue,
        fontSize: 14
    },
    donwHelpButton: {
        color: mainBlue,
        fontSize: 14
    }
  })