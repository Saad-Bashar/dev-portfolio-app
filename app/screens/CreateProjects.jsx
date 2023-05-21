import { Image, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../theme/colors";
import { metrics } from "../theme/metrics";
import Text from "../components/text/Text";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../hooks/useUser";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export default function CreateProjects() {
    const [image, setImage] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null);
    const user = useUser();
    const { userId } = user || {};

    const chooseImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (imageFile) => {
        const timestamp = new Date().getTime();
        const imageName = userId + timestamp;

        const storageRef = storage().ref();
        const imageRef = storageRef.child(
            `users/${userId}/projects/${imageName}`
        );

        await imageRef.put(imageFile);
        const imageUrl = await imageRef.getDownloadURL();
        return imageUrl;
    };

    const submit = async () => {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageUrl = await uploadImage(blob);

        const userDocRef = firestore().collection("users").doc(userId);
        await userDocRef.collection("projects").add({
            projectTitle,
            image: imageUrl,
        });
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.black,
                padding: metrics.spacing.m,
            }}
        >
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ height: 200, width: 250 }}
                />
            )}

            <Input
                placeholder={"Project Title"}
                onChangeText={(text) => {
                    setProjectTitle(text);
                }}
            />

            <Button title={"Choose Image"} onPress={chooseImage} />

            <Button title="Submit" onPress={submit} />
        </View>
    );
}
