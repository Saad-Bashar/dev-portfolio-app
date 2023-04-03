import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { metrics } from "../theme/metrics";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputList from "../components/input-list/InputList";

export default function Signup({ navigation }) {
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
                password: yup.string().min(4).required("Password is required"),
                name: yup.string().required("Name is required"),
                age: yup.string().required("Age is required"),
            })
        ),
    });

    const onSubmit = async ({ name, age, password, email }) => {
        // create user
        const userCredential = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        // grab the UID
        const userId = userCredential.user.uid;

        // create user profile
        const userProfile = {
            name,
            age,
            userId: userId,
        };

        // add user profile to firestore
        await firestore()
            .collection("users") // table name
            .doc(userId) // add userId
            .set(userProfile); // set the profile
    };

    return (
        <View
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
                                autoCapitalize="none"
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

            <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field: { onChange } }) => {
                    return (
                        <>
                            <Input
                                placeholder={"Full Name"}
                                onChangeText={onChange}
                            />
                            {errors.name && (
                                <Text
                                    customStyles={{
                                        color: "red",
                                        paddingBottom: metrics.spacing.s,
                                    }}
                                >
                                    {errors.name.message}
                                </Text>
                            )}
                        </>
                    );
                }}
            />

            <Controller
                control={control}
                name="age"
                defaultValue=""
                render={({ field: { onChange } }) => {
                    return (
                        <>
                            <Input
                                placeholder={"Age"}
                                onChangeText={onChange}
                            />
                            {errors.age && (
                                <Text
                                    customStyles={{
                                        color: "red",
                                        paddingBottom: metrics.spacing.s,
                                    }}
                                >
                                    {errors.age.message}
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
                {isSubmitSuccessful && (
                    <Text
                        centered
                        customStyles={{
                            color: "green",
                            paddingBottom: metrics.spacing.s,
                        }}
                    >
                        Signup Successful
                    </Text>
                )}
                {isSubmitting ? (
                    <ActivityIndicator />
                ) : (
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        title="Submit"
                        customStyles={{ alignSelf: "center" }}
                    />
                )}
            </View>
        </View>
    );
}
