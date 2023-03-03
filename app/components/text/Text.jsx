import { Text as RNText } from "react-native";
import React from "react";
import { presets } from "./Text.preset";
import { colors } from "../../theme/colors";
import { StyleSheet } from "react-native";

export default function Text({ children, customStyles, preset = "body" }) {
  const textStyle = presets[preset];
  return (
    <RNText style={[textStyle, styles.text, customStyles]}>{children}</RNText>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.white },
});
