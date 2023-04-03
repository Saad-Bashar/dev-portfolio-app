import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { metrics } from "../../theme/metrics";

export default function Input({
    placeholder,
    onChangeText,
    customStyles,
    onBlur,
    secureTextEntry,
    autoCapitalize,
    multiline,
    defaultValue,
}) {
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={[styles.input, customStyles]}
            placeholderTextColor={colors.grey}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            autoCapitalize={"none"}
            autoCorrect={false}
            multiline={multiline}
            defaultValue={defaultValue}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        paddingVertical: metrics.spacing.m,
        color: colors.white,
        marginBottom: metrics.spacing.m,
        fontFamily: "body",
    },
});
