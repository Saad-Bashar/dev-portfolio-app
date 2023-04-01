import { View, Pressable } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Text from "../components/text/Text";
import { metrics } from "../theme/metrics";
import Divider from "../components/divider/Divider";

export default function CreatePortfolio() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.black,
                paddingHorizontal: metrics.spacing.m,
            }}
        >
            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: metrics.spacing.l,
                }}
            >
                <Text>About yourself</Text>
                <Ionicons name="caret-forward" size={18} color="white" />
            </Pressable>
            <Divider />
            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: metrics.spacing.l,
                }}
            >
                <Text>Your skills</Text>
                <Ionicons name="caret-forward" size={18} color="white" />
            </Pressable>
            <Divider />
            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: metrics.spacing.l,
                }}
            >
                <Text>Your projects</Text>
                <Ionicons name="caret-forward" size={18} color="white" />
            </Pressable>
        </SafeAreaView>
    );
}
