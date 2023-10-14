// React / React-Native
import { View, Image, Platform, Text, TouchableOpacity } from 'react-native';
// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// Styles
import { mainBlue, mainDarkBlue, mainDefaultWhite, mainWhite } from '../../styles/colorConst';
// Screens
import MainScreen from '../../screens/user/MainScreen/MainScreen';
import Map from '../../screens/user/Map/Map';
import Profile from '../../screens/user/Profile/Profile';
import UserCahngeInfo from '../../screens/user/UserChangeInfo/UserCahngeInfo';
import ViewBank from '../../screens/user/ViewBank/ViewBank';
import Medal from '../../screens/user/Medal/Medal';
import Approval from '../../screens/user/Approval/Approval';


const Stack = createStackNavigator()

const MainStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: mainWhite,
                    borderBottomColor: mainWhite,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: '500'
                },
                headerTintColor: mainDarkBlue,
            }}
        >
            <Stack.Screen
                name='MainScreen'
                component={MainScreen}
                options={{title: 'Главная', headerShown: true, headerStyle: {backgroundColor: 'transparent',
                borderBottomColor: mainWhite,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,}}}
            />
            <Stack.Screen
                name='ViewBank'
                component={ViewBank}
                options={{title: 'Просмотр банка', headerShown: false, headerStyle: {height: 0, backgroundColor: 'transparent',
                borderBottomColor: mainWhite,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,}}}
            />
            <Stack.Screen
                name='Approval'
                component={Approval}
                options={{title: '', headerShown: true, headerStyle: {backgroundColor: 'transparent',
                borderBottomColor: mainWhite,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,}}}
            />
        </Stack.Navigator>
    )
}

const MapStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: mainDefaultWhite,
                    borderBottomColor: mainDefaultWhite,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: '500'
                },
                headerTintColor: mainDarkBlue,
            }}
        >
            <Stack.Screen
                name='Map'
                component={Map}
                options={{title: '', headerShown: false, headerStyle: {height: 55, backgroundColor: 'transparent',
                borderBottomColor: 'white',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,}}}
            />
            <Stack.Screen
                name='Medal'
                component={Medal}
                options={{title: 'Достижения', headerShown: true, headerStyle: {backgroundColor: 'transparent',
                borderBottomColor: mainDefaultWhite,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,}}}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: mainWhite,
                    borderBottomColor: mainWhite,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: '500',
                    textAlign: 'left'
                },
                headerTintColor: mainDarkBlue,
            }}
        >
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{title: '', headerShown: true, headerStyle: {height: 0, backgroundColor: 'transparent',
                borderBottomColor: mainWhite,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,}}}
            />
            <Stack.Screen
                name='ProfileChange'
                component={UserCahngeInfo}
                options={{title: 'Редактирование профиля', headerShown: true, headerStyle: {backgroundColor: 'transparent',
                borderBottomColor: mainWhite,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }}}
            />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    elevation: 5,
                    backgroundColor: mainDarkBlue,
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                    shadowColor: '#00000094',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    borderRadius: 0,
                    paddingHorizontal: 32,
                    borderColor: mainDarkBlue,
                    borderTopColor: mainDarkBlue,
                    height: 84,
                    paddingTop: 12
                }
            }}
        >
            <Tab.Screen name='MainTab' component={MainStack} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                        <View style={{
                            width: 44,
                            height: 44,
                            backgroundColor: focused ? mainWhite : mainDarkBlue,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100
                        }}>
                            <Icons name="cards-outline" size={30} color={focused ? mainBlue : mainWhite} />
                        </View>
                    </View>
                ),}}/>
                <Tab.Screen name='Maptab' component={MapStack} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            width: 44,
                            height: 44,
                            backgroundColor: focused ? mainWhite : mainDarkBlue,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100
                        }}>
                            <Ionicons name="map-outline" size={30} color={focused ? mainBlue : mainWhite} />
                        </View>
                ),}}/>
                <Tab.Screen name='ProfileTab' component={ProfileStack} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{
                            width: 44,
                            height: 44,
                            backgroundColor: focused ? mainWhite : mainDarkBlue,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100
                        }}>
                            <Icon name="user-o" size={30} color={focused ? mainBlue : mainWhite} />
                        </View>
                ),}}/>
        </Tab.Navigator>
    );
} 

export default Tabs