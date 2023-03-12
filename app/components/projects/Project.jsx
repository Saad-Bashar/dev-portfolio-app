import { View, Image, useWindowDimensions, Linking } from "react-native";
import React from "react";
import { images } from "../../theme/images";
import Text from "../text/Text";
import Button from "../button/Button";
import { metrics } from "../../theme/metrics";

export default function Project({
  title,
  languages,
  image,
  sourceCodeLink,
  projectLink,
}) {
  const { width } = useWindowDimensions();
  // image width is 343
  // image height is 250
  // find out the ratio
  const ratio = width / 343;
  const height = 250 * ratio;

  return (
    <View style={{ marginVertical: metrics.spacing.l }}>
      <Image
        source={image}
        resizeMode="contain"
        style={{
          height: height,
          width: width - metrics.spacing.m * 2,
          alignSelf: "center",
        }}
      />
      <View style={{ marginTop: metrics.spacing.l }}>
        <Text preset="headingMed">{title}</Text>
        <Text customStyles={{ paddingTop: metrics.spacing.s }}>
          {languages.join(" ")}
        </Text>
      </View>
      <View
        style={{
          paddingTop: metrics.spacing.m,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          title="view project"
          customStyles={{ marginRight: metrics.spacing.l }}
          onPress={() => {
            Linking.openURL(projectLink);
          }}
        />
        <Button
          title="view code"
          onPress={() => {
            Linking.openURL(sourceCodeLink);
          }}
        />
      </View>
    </View>
  );
}
