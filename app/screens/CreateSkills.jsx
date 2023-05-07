import { View, Text, Pressable } from "react-native";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { colors } from "../theme/colors";
import { metrics } from "../theme/metrics";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "../hooks/useUser";
import { showMessage } from "react-native-flash-message";

export default function CreateSkills() {
    const user = useUser();
    const { userId } = user || {};
    const { control, handleSubmit } = useForm({
        defaultValues: {
            items: [
                {
                    name: "",
                    exp: "",
                },
            ],
        },
    });

    const { append, remove, fields } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit = (data) => {
        let skills = data?.items || [];
        const userDocRef = firestore().collection("users").doc(userId);

        // add each skill object as a document inside the 'skills' subcollection
        skills.forEach((skill) => {
            userDocRef
                .collection("skills")
                .add(skill)
                .then((docRef) => {
                    console.log("Done");
                    showMessage({
                        message: "Successfully added",
                        type: "success",
                        icon: "success",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    showMessage({
                        message: "Something went wrong",
                        type: "danger",
                        icon: "danger",
                    });
                });
        });
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.black,
                padding: metrics.spacing.m,
            }}
        >
            {fields.map((field, index) => {
                const nameFieldName = `items[${index}].name`;
                const expFieldName = `items[${index}].exp`;

                return (
                    <View
                        key={field.id}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Controller
                            control={control}
                            name={nameFieldName}
                            defaultValue={field.name}
                            render={({ field: { onChange } }) => {
                                return (
                                    <Input
                                        placeholder={"Name"}
                                        onChangeText={onChange}
                                        customStyles={{
                                            flex: 1,
                                            marginRight: metrics.spacing.m,
                                        }}
                                    />
                                );
                            }}
                        />

                        <Controller
                            control={control}
                            name={expFieldName}
                            defaultValue={field.exp}
                            render={({ field: { onChange } }) => {
                                return (
                                    <Input
                                        placeholder={"Exp"}
                                        onChangeText={onChange}
                                        customStyles={{ flex: 1 }}
                                    />
                                );
                            }}
                        />

                        {index !== 0 && (
                            <Pressable
                                onPress={() => {
                                    remove(index);
                                }}
                                style={{
                                    marginTop: metrics.spacing.l,
                                    marginLeft: metrics.spacing.m,
                                }}
                            >
                                <Ionicons
                                    name="md-trash-bin"
                                    size={24}
                                    color="white"
                                />
                            </Pressable>
                        )}
                    </View>
                );
            })}

            <Button
                title={"Add a new experience"}
                customStyles={{ marginTop: metrics.spacing.xxl }}
                onPress={() => {
                    append({
                        name: "",
                        exp: "",
                    });
                }}
            />

            <Button
                title={"Submit"}
                customStyles={{ marginTop: metrics.spacing.xxxl }}
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    );
}
