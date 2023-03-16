import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import auth from "@react-native-firebase/auth";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is Required"),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async values => {
    const { email, password } = values;
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error in signing in", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Screen</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => handleLogin(values)}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              placeholderTextColor="#ccc"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#ccc"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              style={{
                marginTop: 20,
              }}
            >
              Foget Password?
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    width: "90%",
    height: 50,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "blue",
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginLeft: 10,
  },
});

export default LoginScreen;
