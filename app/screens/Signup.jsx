import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { firebase } from "@react-native-firebase/auth";

import * as yup from "yup";
import { metrics } from "../theme/metrics";
import firestore from "@react-native-firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../theme/colors";
import Input from "../components/input/Input";
import Text from "../components/text/Text";

const SignUpScreen = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().min(6).required(),
                name: yup.string().required(),
                age: yup.string().required(),
            })
        ),
    });
    const onSubmit = async (values) => {
        try {
            console.log(values);
            // Create user with email and password
            const userCredential = await firebase
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password);

            // Get the user ID from the userCredential object
            const userID = userCredential.user.uid;

            // Create user object with name, age, gender, and user ID
            const userObject = {
                name: values.name,
                age: values.age,
                userID: userID,
            };

            // Add user object to Firestore collection
            const res = await firestore()
                .collection("users")
                .doc(userID)
                .set(userObject);
            console.log(res);
        } catch (error) {
            console.log(error);
            // set error message
            setError("Something went wrong!");
        }
    };

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, onBlur } }) => (
                    <>
                        <Input
                            placeholder={"Email"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                        {errors.email && (
                            <Text customStyles={styles.error}>
                                {errors.email.message}
                            </Text>
                        )}
                    </>
                )}
            />

            <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Input
                            placeholder={"Password"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                        {errors.password && (
                            <Text customStyles={styles.error}>
                                {errors.password.message}
                            </Text>
                        )}
                    </>
                )}
            />

            <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field: { onChange, onBlur } }) => (
                    <>
                        <Input
                            placeholder={"Full Name"}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                        {errors.name && (
                            <Text customStyles={styles.error}>
                                {errors.name.message}
                            </Text>
                        )}
                    </>
                )}
            />

            <Controller
                control={control}
                name="age"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Input
                            placeholder={"Age"}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                        {errors.age && (
                            <Text customStyles={styles.error}>
                                {errors.age.message}
                            </Text>
                        )}
                    </>
                )}
            />

            {errors.submit && (
                <Text customStyles={styles.error}>{errors.submit.message}</Text>
            )}
            {isSubmitting ? (
                <ActivityIndicator />
            ) : (
                <Button
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                    customStyles={{
                        alignSelf: "center",
                        marginVertical: metrics.spacing.xxl,
                    }}
                />
            )}

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text centered onPress={() => navigation.navigate("Login")}>
                    Already have an account? Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.black,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        color: colors.white,
    },
    button: {
        backgroundColor: "#2196f3",
        borderRadius: 10,
        padding: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginBottom: 10,
    },
});

export default SignUpScreen;
