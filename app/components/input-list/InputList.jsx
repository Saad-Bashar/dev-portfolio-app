import { View, Text } from "react-native";
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Input from "../input/Input";
import { colors } from "../../theme/colors";
import { metrics } from "../../theme/metrics";
import Button from "../button/Button";

export default function InputList() {
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            items: [{ name: "", amount: 0 }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: "items",
        control,
    });
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <View
            style={{
                backgroundColor: colors.black,
                flex: 1,
                paddingHorizontal: metrics.spacing.m,
            }}
        >
            {fields.map((field, i) => {
                return (
                    <View key={field.id}>
                        <View style={{ flexDirection: "row" }}>
                            <Controller
                                control={control}
                                name={`items[${i}].name`}
                                defaultValue={`${field.name}`}
                                render={({ field: { onChange } }) => {
                                    return (
                                        <>
                                            <Input
                                                placeholder={"Name" + i}
                                                customStyles={{
                                                    marginRight: 10,
                                                    flex: 1,
                                                }}
                                            />
                                        </>
                                    );
                                }}
                            />

                            <Controller
                                control={control}
                                name={`items[${i}].amount`}
                                defaultValue={`${field.amount}`}
                                render={({ field: { onChange } }) => {
                                    return (
                                        <>
                                            <Input
                                                placeholder={"Amount"}
                                                customStyles={{ flex: 0.2 }}
                                            />
                                        </>
                                    );
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                title="Delete"
                                onPress={() => {
                                    remove(i);
                                }}
                            />
                        </View>
                    </View>
                );
            })}

            <Button
                title="Add one more"
                customStyles={{
                    marginRight: metrics.spacing.l,
                    marginTop: metrics.spacing.l,
                }}
                onPress={() => {
                    append({
                        items: [
                            {
                                name: "",
                                amount: 0,
                            },
                        ],
                    });
                }}
            />
            <Button onPress={handleSubmit(onSubmit)} title="Submit" />
        </View>
    );
}
