import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";
import { metrics } from "../theme/metrics";
import firestore from "@react-native-firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = async (values, { setSubmitting, setErrors }) => {
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
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", name: "", age: "" }}
        onSubmit={handleSignUp}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        })}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }) => (
          <>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.input}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
              placeholder="Age"
              style={styles.input}
              value={values.age}
              onChangeText={handleChange("age")}
              onBlur={handleBlur("age")}
            />
            {errors.age && <Text style={styles.error}>{errors.age}</Text>}
            {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <Text style={[styles.loginText, { marginTop: metrics.spacing.xxl }]}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
