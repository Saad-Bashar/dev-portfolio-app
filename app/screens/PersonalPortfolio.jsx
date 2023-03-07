import {
  Image,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { metrics } from "../theme/metrics";
import { images } from "../theme/images";
import Button from "../components/button/Button";
import Divider from "../components/divider/Divider";
import Skill from "../components/skills/Skill";

const skills = [
  {
    title: "HTML",
    subtitle: "4 years experience",
  },
  {
    title: "CSS",
    subtitle: "2 years experience",
  },
  {
    title: "Javascript",
    subtitle: "3 years experience",
  },
  {
    title: "Accessibility",
    subtitle: "5 years experience",
  },
  {
    title: "React",
    subtitle: "1 years experience",
  },
  {
    title: "Sass",
    subtitle: "3 years experience",
  },
];

export default function PersonalPortfolio() {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <ScrollView>
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

        {/* ABOUT */}
        <View
          style={{
            marginHorizontal: metrics.spacing.m,
            marginVertical: metrics.spacing.xxl,
          }}
        >
          <Text
            preset="headingXl"
            customStyles={{
              textAlign: "center",
            }}
          >
            Nice to meet you! I’m{" "}
            <Text
              preset="headingXl"
              customStyles={{
                textDecorationLine: "underline",
                textDecorationColor: colors.green,
              }}
            >
              Adam Keyes.
            </Text>
          </Text>
          <Text
            customStyles={{
              textAlign: "center",
              paddingTop: metrics.spacing.l,
            }}
          >
            Based in the UK, I’m a front-end developer passionate about building
            accessible web apps that users love.
          </Text>

          <Button
            title="Contact me"
            customStyles={{
              marginVertical: metrics.spacing.xxl,
              alignSelf: "center",
            }}
            onPress={() => {}}
          />
        </View>

        <Divider customStyles={{ marginHorizontal: metrics.spacing.m }} />

        {/* SKILLS */}
        <View style={{ alignItems: "center" }}>
          {skills.map((skill, index) => (
            <Skill
              key={skill.title}
              title={skill.title}
              subtitle={skill.subtitle}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
