import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { metrics } from "../../theme/metrics";

export default function Input({ placeholder, onChangeText, customStyles }) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.input, customStyles]}
      placeholderTextColor={colors.grey}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    padding: metrics.spacing.m,
    color: colors.white,
    marginBottom: metrics.spacing.m,
  },
});
