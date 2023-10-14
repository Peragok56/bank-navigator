import { NavigationContainer } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Tabs from './src/navigation/user/userTab';
import { useEffect, useState } from 'react';
import AuthStack from './src/navigation/auth/authStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Context } from './context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import axios from './src/axios/axios';
import storage from './storage';

export default function App() {

  const [auth, setAuth] = useState<boolean>(false)

  const signIn = (data: any ) => {
    axios.post('/auth/signIn', data)
    .then(res => {
      console.log(res.data);
      
      storage.save({
        key: 'token',
        data: {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + (3600 * 24 * 1000)
        }
      }).then(res2 => {
        setAuth(true)
      })
      .catch(err => {
        console.log(err);
      })
  
    })
    .catch(err => {
      console.log(err.response.data);
      
      Alert.alert(
        "Упс",
        `${typeof err.response.data.message == typeof [] ?
          err.response.data.message[0] : 
          err.response.data.message}`,
        [
          {
            text: `Понятно`,
            style: "cancel",
          },
        ],
      );
    })
  }

  const signUp = (data: any) => {
    axios.post('/auth/signUp', data)
    .then(res => {
      storage.save({
        key: 'token',
        data: {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiresIn: Date.now() + (3600 * 24 * 1000)
        }
      }).then(res2 => {
        setAuth(true)
      })
  
    })
    .catch(err => {
      Alert.alert(
        "Упс",
        `${typeof err.response.data.message == typeof [] ?
          err.response.data.message[0] : 
          err.response.data.message}`,
        [
          {
            text: `Понятно`,
            style: "cancel",
          },
        ],
      );
    })
  }

  const logOut = () => {

  }

  const saveUserUpdate = () => {

  }

  // useEffect(() => {
  //   try {
  //     storage.load({
  //       key: 'token'
  //     })
  //     .then(res => {
  //       console.log(res.expiresIn)
  //       console.log(Date.now());
  //       if (Date.now() > res.expiresIn) {
  //         axios.get('/auth/refresh', {headers: {Authorization: `Bearer ${res.refresh_token}`}})
  //         .then(res2 => {
  //           console.log(res2.data)
  //           storage.save({
  //             key: 'token',
  //             data: {
  //               access_token: res2.data.accessToken,
  //               refresh_token: res2.data.refreshToken,
  //               expiresIn: Date.now() + (3600 * 24 * 1000)
  //             }
  //           })
  //           setAuth(true)
  //         })
  //         .catch(err => {
  //           console.log(err.response.data);
  //         })
  //       } else {
  //         console.log('succsess');
  //         setAuth(true)
  //       }
  //     })
  //   } catch (error) {
  //     console.log('hi')
  //     console.log(error);
  //   }
  // }, [auth])

  return (
    <Provider store={store}>
      <Context.Provider value={{
        signIn, signUp, logOut, saveUserUpdate
      }}>
          { 
            auth === false ? 
              <AuthStack />
             : 
             <NavigationContainer>
              <Tabs />
            </NavigationContainer>
          }
      </Context.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
