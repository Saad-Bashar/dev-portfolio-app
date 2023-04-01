import React from "react";
import { Pressable, View } from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Input from "../input/Input";
import { colors } from "../../theme/colors";
import { metrics } from "../../theme/metrics";
import Button from "../button/Button";
import { Ionicons } from "@expo/vector-icons";
import { LayoutAnimation } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const DynamicForm = () => {
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            items: [{ name: "", amount: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit = (data) => {
        let skills = data?.items || [];
        console.log("DATA", data);
        const userId = auth().currentUser.uid;
        const userDocRef = firestore().collection("users").doc(userId);
        // add each skill object as a document in the 'skills' subcollection
        skills.forEach((skill) => {
            userDocRef
                .collection("skills")
                .add(skill)
                .then((docRef) => {
                    console.log(
                        `Skill document with ID ${docRef.id} added to 'skills' subcollection`
                    );
                })
                .catch((error) => {
                    console.error(
                        "Error adding skill document to subcollection:",
                        error
                    );
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
                const amountFieldName = `items[${index}].amount`;
                return (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                        key={field.id}
                    >
                        <Controller
                            control={control}
                            name={nameFieldName}
                            defaultValue={field.name}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder={"Name"}
                                    customStyles={{
                                        flex: 1,
                                    }}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name={amountFieldName}
                            defaultValue={field.amount}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder={"Amount"}
                                    customStyles={{
                                        flex: 0.5,
                                        marginLeft: metrics.spacing.m,
                                    }}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        <Pressable
                            onPress={() => {
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut
                                );

                                remove(index);
                            }}
                            style={{ marginTop: 16, marginLeft: 10 }}
                        >
                            <Ionicons
                                name="md-trash-bin"
                                size={24}
                                color="white"
                            />
                        </Pressable>
                    </View>
                );
            })}
            <Button
                title="Add"
                onPress={() => {
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                    );
                    append({ name: "", amount: "" });
                }}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export default DynamicForm;
