import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { metrics } from "../theme/metrics";
import Text from "../components/text/Text";
import DynamicForm from "../components/input-list/InputList";

export default function CreateSkill() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.black,
                paddingHorizontal: metrics.spacing.m,
            }}
        >
            <DynamicForm />
        </SafeAreaView>
    );
}
