import { Pressable, View } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { AntDesign } from "@expo/vector-icons";
import { metrics } from "../theme/metrics";

const Menu = ({ title, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: metrics.spacing.xl,
            }}
        >
            <Text>{title}</Text>
            <AntDesign name="rightcircle" size={24} color={colors.white} />
        </Pressable>
    );
};

export default function CreatePortfolio({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.black,
                padding: metrics.spacing.m,
            }}
        >
            <Menu
                title="About Myself"
                onPress={() => navigation.navigate("Create Bio")}
            />
            <Menu
                title="My Skills"
                onPress={() => navigation.navigate("Create Skills")}
            />
            <Menu
                title="My Projects"
                onPress={() => navigation.navigate("Create Projects")}
            />
        </View>
    );
}
