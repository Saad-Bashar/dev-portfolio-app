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

export default function ForgetPassword({ navigation }) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Bad email"),
            })
        ),
    });

    const onSubmit = async ({ email }) => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            navigation.goBack();
        } catch (err) {}
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.black,
                padding: metrics.spacing.m,
            }}
        >
            <Text>Provide the email address</Text>
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
                        title="Send EMAIL"
                        customStyles={{ alignSelf: "center" }}
                    />
                )}
            </View>
        </View>
    );
}
