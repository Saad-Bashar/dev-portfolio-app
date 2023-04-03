import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    useWindowDimensions,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { metrics } from "../theme/metrics";
import { images } from "../theme/images";
import Button from "../components/button/Button";
import Divider from "../components/divider/Divider";
import Skill from "../components/skills/Skill";
import Project from "../components/projects/Project";
import Input from "../components/input/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { firebase } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useUser } from "../hooks/useUser";

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

const projects = [
    {
        title: "DESIGN PORTFOLIO",
        languages: ["HTML", "CSS", "JAVASCRIPT"],
        image: images.project1,
        sourceCodeLink: "https://www.google.com/",
        projectLink: "https://www.google.com/",
    },
    {
        title: "E-LEARNING LANDING PAGE",
        languages: ["HTML", "CSS", "JAVASCRIPT"],
        image: images.project2,
        sourceCodeLink: "https://www.google.com/",
        projectLink: "https://www.google.com/",
    },
    {
        title: "TODO WEB APP",
        languages: ["HTML", "CSS", "JAVASCRIPT"],
        image: images.project3,
        sourceCodeLink: "https://www.google.com/",
        projectLink: "https://www.google.com/",
    },
    {
        title: "ENTERTAINMENT WEB APP",
        languages: ["HTML", "CSS", "JAVASCRIPT"],
        image: images.project4,
        sourceCodeLink: "https://www.google.com/",
        projectLink: "https://www.google.com/",
    },
    {
        title: "MEMORY GAME",
        languages: ["HTML", "CSS", "JAVASCRIPT"],
        image: images.project5,
        sourceCodeLink: "https://www.google.com/",
        projectLink: "https://www.google.com/",
    },
];

export default function PersonalPortfolio({ navigation }) {
    const { width } = useWindowDimensions();
    const user = useUser();

    const { name, bio } = user || {};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
            <ScrollView>
                <Pressable
                    style={{
                        alignSelf: "flex-end",
                        paddingRight: metrics.spacing.m,
                        paddingTop: metrics.spacing.m,
                    }}
                    onPress={() => {
                        navigation.navigate("Menu");
                    }}
                >
                    <Ionicons
                        name="add-circle"
                        size={32}
                        color={colors.white}
                    />
                </Pressable>
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
                                textTransform: "capitalize",
                            }}
                            preset="headingLarge"
                        >
                            {name}
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
                            style={{
                                marginTop: metrics.spacing.xxxl,
                                alignSelf: "center",
                            }}
                        >
                            <Image source={images.developer} />
                        </View>
                    </View>

                    {/* GROUP */}
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 120,
                            zIndex: -1,
                        }}
                    >
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
                                textTransform: "capitalize",
                            }}
                        >
                            {name}.
                        </Text>
                    </Text>
                    <Text
                        customStyles={{
                            textAlign: "center",
                            paddingTop: metrics.spacing.l,
                        }}
                    >
                        {bio}
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

                <Divider
                    customStyles={{ marginHorizontal: metrics.spacing.m }}
                />

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

                <View>
                    <Divider
                        customStyles={{
                            marginHorizontal: metrics.spacing.m,
                            marginVertical: metrics.spacing.xxl,
                        }}
                    />
                    <View
                        style={{
                            position: "absolute",
                            top: -20,
                            right: 0,
                            zIndex: -1,
                        }}
                    >
                        <Image source={images.groupRight} />
                    </View>
                </View>

                {/* PROJECTS */}
                <View
                    style={{
                        marginHorizontal: metrics.spacing.m,
                        marginVertical: metrics.spacing.xxl,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text preset="headingXl">Projects</Text>
                        <Button title="Contact me" />
                    </View>

                    {projects.map(
                        (
                            {
                                title,
                                image,
                                languages,
                                projectLink,
                                sourceCodeLink,
                            },
                            index
                        ) => (
                            <Project
                                key={title}
                                title={title}
                                image={image}
                                languages={languages}
                                projectLink={projectLink}
                                sourceCodeLink={sourceCodeLink}
                            />
                        )
                    )}
                </View>

                {/* CONTACT */}
                <View
                    style={{
                        backgroundColor: colors.darkGrey,
                        paddingVertical: metrics.spacing.xxl,
                        paddingHorizontal: metrics.spacing.m,
                    }}
                >
                    <Text centered preset="headingXl">
                        Contact
                    </Text>
                    <Text
                        centered
                        customStyles={{ paddingTop: metrics.spacing.s }}
                    >
                        I would love to hear about your project and how I could
                        help. Please fill in the form, and I’ll get back to you
                        as soon as possible.
                    </Text>

                    <View style={{ paddingTop: metrics.spacing.xl }}>
                        <Input placeholder="Name" />
                        <Input placeholder="Email" />
                        <Input
                            placeholder="Message"
                            customStyles={{
                                height: 120,
                            }}
                        />
                        <Button
                            title="send message"
                            customStyles={{
                                alignSelf: "flex-end",
                                marginTop: metrics.spacing.l,
                            }}
                        />
                    </View>
                    <View>
                        <Divider
                            customStyles={{
                                marginVertical: metrics.spacing.xxl,
                            }}
                        />

                        <View
                            style={{
                                position: "absolute",
                                left: -20,
                                top: -100,
                                zIndex: -1,
                            }}
                        >
                            <Image source={images.group} />
                        </View>
                    </View>

                    <View style={{ width: width - 200, alignSelf: "center" }}>
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
                                justifyContent: "space-around",
                            }}
                        >
                            <Image source={images.github} />
                            <Image source={images.linkedin} />
                            <Image source={images.frontendmentor} />
                            <Image source={images.twitter} />
                        </View>
                    </View>
                </View>
                <Button
                    onPress={async () => {
                        // navigation.navigate("Login");
                        await firebase.auth().signOut();
                    }}
                    title="Log out"
                    customStyles={{ alignSelf: "center" }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
