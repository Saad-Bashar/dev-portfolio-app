import { ActivityIndicator, Alert, Pressable, View } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { metrics } from "../theme/metrics";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { firebase } from "@react-native-firebase/auth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Bad email"),
                password: yup.string().min(4).required("Password is required"),
            })
        ),
    });

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert("Success");
        } catch (e) {
            if (e.code === "auth/wrong-password") {
                Alert.alert("Invalid Credentials");
            }
            if (e.code === "auth/user-not-found") {
                Alert.alert("User not found");
            }
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.black,
                paddingHorizontal: metrics.spacing.m,
            }}
        >
            <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange } }) => {
                    return (
                        <>
                            <Input
                                placeholder={"Email"}
                                onChangeText={onChange}
                            />
                            {errors.email && (
                                <Text
                                    customStyles={{
                                        color: "red",
                                        paddingBottom: metrics.spacing.s,
                                    }}
                                >
                                    {errors.email.message}
                                </Text>
                            )}
                        </>
                    );
                }}
            />

            <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { onChange } }) => {
                    return (
                        <>
                            <Input
                                placeholder={"Password"}
                                secureTextEntry
                                onChangeText={onChange}
                            />
                            {errors.password && (
                                <Text
                                    customStyles={{
                                        color: "red",
                                        paddingBottom: metrics.spacing.s,
                                    }}
                                >
                                    {errors.password.message}
                                </Text>
                            )}
                        </>
                    );
                }}
            />

            <Pressable
                onPress={() => {
                    navigation.navigate("ForgotPassword");
                }}
                style={{ marginTop: metrics.spacing.xl }}
            >
                <Text customStyles={{ color: colors.green }}>
                    Forgot Passowrd?
                </Text>
            </Pressable>

            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    paddingBottom: metrics.spacing.xxxl,
                }}
            >
                {isSubmitting ? (
                    <ActivityIndicator />
                ) : (
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        title="Login"
                        customStyles={{ alignSelf: "center" }}
                    />
                )}
            </View>

            <Pressable
                onPress={() => {
                    navigation.navigate("Signup");
                }}
                style={{ marginBottom: metrics.spacing.xl }}
            >
                <Text centered>
                    Don't have an account yet? Sign up for a new account
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}
