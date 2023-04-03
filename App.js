import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import PersonalPortfolio from "./app/screens/PersonalPortfolio";
import {
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    useFonts,
} from "@expo-google-fonts/space-grotesk";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PortfolioMenu from "./app/screens/PortfolioMenu";
import SignUpScreen from "./app/screens/Signup";
import LoginScreen from "./app/screens/Login";
import { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import ForgotPassword from "./app/screens/ForgetPassword";
import { colors } from "./app/theme/colors";
import CreateBio from "./app/screens/CreateBio";
import CreateSkills from "./app/screens/CreateSkills";
import CreateProjects from "./app/screens/CreateProjects";
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        heading: SpaceGrotesk_700Bold,
        body: SpaceGrotesk_500Medium,
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            console.log("USER IN APP " + user);
            setUser(user);
        });

        return unsubscribe;
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator />;
    }

    return (
        <NavigationContainer>
            {!user ? (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Group
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: colors.black,
                            },
                            headerTitleStyle: {
                                color: colors.white,
                                fontFamily: "heading",
                                fontSize: 20,
                            },
                        }}
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen
                            name="Signup"
                            options={{
                                title: "Create a new account",
                            }}
                            component={SignUpScreen}
                        />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                        />
                    </Stack.Group>
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Group>
                        <Stack.Screen
                            name="Preview"
                            component={PersonalPortfolio}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Menu"
                            component={PortfolioMenu}
                            options={{
                                headerStyle: {
                                    backgroundColor: colors.black,
                                },
                                headerTitleStyle: {
                                    color: colors.white,
                                    fontFamily: "heading",
                                    fontSize: 20,
                                },
                            }}
                        />
                        <Stack.Screen
                            name="Create Bio"
                            component={CreateBio}
                            options={{
                                headerStyle: {
                                    backgroundColor: colors.black,
                                },
                                headerTitleStyle: {
                                    color: colors.white,
                                    fontFamily: "heading",
                                    fontSize: 20,
                                },
                            }}
                        />
                        <Stack.Screen
                            name="Create Skills"
                            component={CreateSkills}
                            options={{
                                headerStyle: {
                                    backgroundColor: colors.black,
                                },
                                headerTitleStyle: {
                                    color: colors.white,
                                    fontFamily: "heading",
                                    fontSize: 20,
                                },
                            }}
                        />
                        <Stack.Screen
                            name="Create Projects"
                            component={CreateProjects}
                            options={{
                                headerStyle: {
                                    backgroundColor: colors.black,
                                },
                                headerTitleStyle: {
                                    color: colors.white,
                                    fontFamily: "heading",
                                    fontSize: 20,
                                },
                            }}
                        />
                    </Stack.Group>
                </Stack.Navigator>
            )}

            <StatusBar style="light" />
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
