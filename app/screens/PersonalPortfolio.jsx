import { Image, SafeAreaView, useWindowDimensions, View } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { metrics } from "../theme/metrics";
import { images } from "../theme/images";

export default function PersonalPortfolio() {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <View>
        <View
          style={{
            alignSelf: "center",
            width: width / 2,
          }}
        >
          <Text
            customStyles={{
              textAlign: "center",
            }}
            preset="headingLarge"
          >
            adamkeyes
          </Text>

          {/* Icons */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: metrics.spacing.m,
              justifyContent: "space-evenly",
            }}
          >
            <Image source={images.github} />
            <Image source={images.linkedin} />
            <Image source={images.frontendmentor} />
            <Image source={images.twitter} />
          </View>

          {/* Developer */}
          <View
            style={{ marginTop: metrics.spacing.xxxl, alignSelf: "center" }}
          >
            <Image source={images.developer} />
          </View>
        </View>

        {/* GROUP */}
        <View style={{ position: "absolute", left: 0, top: 120, zIndex: -1 }}>
          <Image source={images.group} />
        </View>

        {/* CIRCLE */}
        <View
          style={{
            position: "absolute",
            right: 0,
            height: 120,
            width: 120,
            borderRadius: 60,
            borderColor: colors.white,
            borderWidth: 1,
            top: 260,
            marginRight: -60,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
