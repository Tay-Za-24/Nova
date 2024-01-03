import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../../firebaseConfig";
import { styles } from "./forgotPasswordStyle";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../util/color";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleResetPassword = async () => {
    try {
      if (email.trim() !== "") {
        await sendPasswordResetEmail(firebaseAuth, email);
        Alert.alert(
          "Password Reset Email Sent",
          "Please check your email to reset your password."
        );
        setEmail("");
      } else {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
      }
    } catch (error) {
      Alert.alert(
        "Password Reset Failed",
        "Please enter a valid email address and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused ? colors.tertiary : '#A9A9A9' },
        ]}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;