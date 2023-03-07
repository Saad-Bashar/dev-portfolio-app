import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { metrics } from "../../theme/metrics";
import { colors } from "../../theme/colors";
import Text from "../text/Text";

export default function Button({ title, onPress, customStyles }) {
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
      <Text customStyles={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: metrics.spacing.s,
    borderBottomWidth: 2,
    borderBottomColor: colors.green,
    alignSelf: "flex-start",
  },
  btnText: {
    color: colors.white,
    fontFamily: "heading",
    textTransform: "uppercase",
  },
});
