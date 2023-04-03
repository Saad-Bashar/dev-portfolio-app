import { ActivityIndicator, View } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../components/input/Input";
import { metrics } from "../theme/metrics";
import Button from "../components/button/Button";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { showMessage } from "react-native-flash-message";
import { useUser } from "../hooks/useUser";

export default function CreateBio() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                bio: yup.string().required("Bio is required"),
            })
        ),
    });
    const user = useUser();
    const { userId, bio } = user || {};

    const onSubmit = async ({ bio }) => {
        const userRef = firestore().collection("users").doc(userId);
        try {
            await userRef.update({
                bio: bio,
            });
            showMessage({
                message: "Bio is updated successfully!",
                type: "success",
            });
        } catch (err) {
            showMessage({
                message: "Something is wrong",
                type: "danger",
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.black,
                padding: metrics.spacing.m,
            }}
        >
            <Controller
                control={control}
                name="bio"
                defaultValue={bio}
                render={({ field: { onChange } }) => {
                    return (
                        <>
                            <Input
                                placeholder={"Write your bio here..."}
                                onChangeText={onChange}
                                multiline={true}
                                defaultValue={bio}
                            />
                            {errors.bio && (
                                <Text
                                    customStyles={{
                                        color: "red",
                                        paddingBottom: metrics.spacing.s,
                                    }}
                                >
                                    {errors.bio.message}
                                </Text>
                            )}
                        </>
                    );
                }}
            />

            {isSubmitting ? (
                <ActivityIndicator />
            ) : (
                <Button
                    onPress={handleSubmit(onSubmit)}
                    title="Save"
                    customStyles={{ alignSelf: "center" }}
                />
            )}
        </View>
    );
}
