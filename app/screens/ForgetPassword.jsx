import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { firebase } from "@react-native-firebase/auth";
import { metrics } from "../theme/metrics";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async values => {
      setIsSubmitting(true);
      try {
        await firebase.auth().sendPasswordResetEmail(values.email);
        setIsSuccess(true);
        setErrorMessage("");
      } catch (error) {
        setIsSuccess(false);
        setErrorMessage(error.message);
      }
      setIsSubmitting(false);
    },
  });

  return (
    <View style={{ padding: metrics.spacing.m }}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {formik.touched.email && formik.errors.email ? (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      ) : null}

      {isSuccess ? (
        <Text style={styles.successText}>
          Reset email sent to {formik.values.email}
        </Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
};
