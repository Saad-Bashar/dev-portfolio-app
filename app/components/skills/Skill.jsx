import { View } from "react-native";
import React from "react";
import Text from "../text/Text";
import { metrics } from "../../theme/metrics";

export default function Skill({ title, subtitle }) {
  return (
    <View style={{ marginTop: metrics.spacing.l }}>
      <Text customStyles={{ textAlign: "center" }} preset="headingXl">
        {title}
      </Text>
      <Text customStyles={{ textAlign: "center" }}>{subtitle}</Text>
    </View>
  );
}
