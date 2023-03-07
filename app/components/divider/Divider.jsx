import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";

export default function Divider({ customStyles }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          height: 1,
        },
        customStyles,
      ]}
    />
  );
}
