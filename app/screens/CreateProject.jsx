import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { metrics } from "../theme/metrics";
import Input from "../components/input/Input";
import Text from "../components/text/Text";
import Button from "../components/button/Button";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import { Image } from "react-native";
import { useUser } from "../hooks/useUser";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export default function CreateProject() {
    const user = useUser();
    const { userId, bio } = user || {};
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({});
    const [image, setImage] = useState(null);
    console.log("IMAGEE -> " + image);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageToFirebase = async (imageFile, userId) => {
        const timestamp = new Date().getTime();
        const imageName = userId + timestamp;
        const storageRef = storage().ref();
        const imageRef = storageRef.child(
            `user/${userId}/projects/${imageName}`
        );

        await imageRef.put(imageFile);
        const imageUrl = await imageRef.getDownloadURL();
        return imageUrl;
    };

    const onSubmit = async ({ projectName }) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageUrl = await uploadImageToFirebase(blob, userId);

        // Save the image URL to the user's document in Firestore
        const userDocRef = firestore().collection("users").doc(userId);
        await userDocRef.collection("project").add({
            projectName,
            image: imageUrl,
        });
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.black,
                paddingHorizontal: metrics.spacing.m,
            }}
        >
            <Controller
                control={control}
                name="projectName"
                defaultValue=""
                render={({ field: { onChange } }) => {
                    return (
                        <>
                            <Input
                                placeholder={"Project Name"}
                                onChangeText={onChange}
                                autoCapitalize="none"
                            />
                            {errors.email && (
                                <Text
                                    customStyles={{
                                        color: "red",
                                        paddingBottom: metrics.spacing.s,
                                    }}
                                >
                                    {errors.projectName.message}
                                </Text>
                            )}
                        </>
                    );
                }}
            />

            <Button title={"Upload Image"} onPress={pickImage} />

            <Button
                onPress={handleSubmit(onSubmit)}
                title="Submit"
                customStyles={{ alignSelf: "center" }}
            />

            {image ? (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            ) : null}
        </SafeAreaView>
    );
}
