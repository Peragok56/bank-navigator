import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "../../screens/auth/Auth";
import SignUp from "../../screens/auth/SignUp";

import { CardStyleInterpolators } from "react-navigation-stack";

const Stack = createStackNavigator()

const AuthStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: 'white',
                    borderBottomColor: 'white',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: '500'
                },
                headerTintColor: '#9B21C6',
                cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
            }}>
                <Stack.Screen 
                    name="authorization"
                    component={Auth}
                    options={{title: ''}}
                />
                <Stack.Screen 
                    name="signUp"
                    component={SignUp}
                    options={{title: ''}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack