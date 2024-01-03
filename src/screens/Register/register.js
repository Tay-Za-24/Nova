import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { styles } from "./registerStyle";
import { Formik } from "formik";
import { RegisterFormHandle } from "../../validation/registerFormHandle";
import { FontAwesome } from "@expo/vector-icons";
import { firebaseAuth, firebaseDb } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { colors } from "../../util/color";
import Animated, { BounceInUp, Easing, FadeIn, FadeInLeft, FadeInUp } from "react-native-reanimated";

const Register = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassowrd, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [nameFocused, setNameFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassowrd)
  }

  const FormSubmit = async (values, actions) => {
    try {
      const { email, password, name } = values;

      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const { user } = userCredential;

      const userDocRef = doc(firebaseDb, "users", user.uid);
      await setDoc(userDocRef, {
        user_id: user.uid,
        name: name,
        email: email,
        password: password,
      });

      console.log("User registered successfully:", user.uid);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <View style={{marginTop : '20%'}}>
    <ScrollView showsVerticalScrollIndicator= {false} >
      <View style={styles.header}>
        <Animated.Text entering={FadeInLeft.delay(300).easing(Easing.ease)} style={styles.headerTlt}>Register to </Animated.Text>
        <Animated.View style={{flexDirection : "row"}} entering={FadeInLeft.delay(500).easing(Easing.ease)}>
          <Text style={styles.headerTlt}>manage </Text>
          <Text style={[styles.headerTlt, { color: colors.accent }]}>your time efficiently</Text>
        </Animated.View>
      </View>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        enableReinitialize={true}
        validationSchema={RegisterFormHandle}
        onSubmit={(values, actions) => {
          FormSubmit(values, actions);
        }}
        onReset={(values) => {}}
      >
        {({
          values,
          errors,
          handleChange,
          setFieldTouched,
          handleSubmit,
          touched,
        }) => (
          <View style={styles.container}>
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.title}>Username</Text>
                <Animated.View entering={FadeInUp.delay(200).easing(Easing.ease)}>
                  <TextInput
                    placeholder="Enter your name"
                    placeholderTextColor="#A9A9A9"
                    style={[
                      styles.input,
                      {
                        borderColor: nameFocused ? colors.tertiary : '#A9A9A9',
                      },
                    ]}
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={() => {
                      setFieldTouched("name")
                      setNameFocused(false)
                    }}
                    onFocus={() => setNameFocused(true)}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorsTxt}>{errors.name}</Text>
                  )}
                </Animated.View>
              </View>
              <View style={styles.inputGroup}>
                <Animated.View entering={FadeInUp.delay(400).easing(Easing.ease)}>
                  <Text style={styles.title}>Email</Text>
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#A9A9A9"
                    style={[
                      styles.input,
                      {
                        borderColor: emailFocused ? colors.tertiary : '#A9A9A9',
                      },
                    ]}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={() => {
                      setFieldTouched("email")
                      setEmailFocused(false)
                    }}
                    onFocus={() => setEmailFocused(true)}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorsTxt}>{errors.email}</Text>
                  )}
                </Animated.View>
              </View>

              <View style={styles.inputGroup}>
                <Animated.View entering={FadeInUp.delay(600).easing(Easing.ease)}>
                    <Text style={styles.title}>Password</Text>
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor="#A9A9A9"
                      style={[
                        styles.input,
                        {
                          borderColor: passwordFocused ? colors.tertiary : '#A9A9A9',
                        },
                      ]}
                      secureTextEntry={!showPassword}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={() => {
                        setFieldTouched("password");
                        setPasswordFocused(false);
                      }}
                      onFocus={() => setPasswordFocused(true)}
                    />
                    {values.password.length > 0 && (
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.showHideIcon}
                      >
                        <FontAwesome
                          name={showPassword ? "eye-slash" : "eye"}
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    )}
                    {errors.password && touched.password && (
                      <Text style={styles.errorsTxt}>{errors.password}</Text>
                  )}
                </Animated.View>
                </View>
                <View style={styles.inputGroup}>
                  <Animated.View entering={FadeInUp.delay(800).easing(Easing.ease)}>
                  <Text style={styles.title}>Confirm Password</Text>
                  <TextInput
                    placeholder="Enter your password again"
                    placeholderTextColor="#A9A9A9"
                    style={[
                      styles.input,
                      {
                        borderColor: confirmPasswordFocused ? colors.tertiary : '#A9A9A9',
                      },
                    ]}
                    secureTextEntry={!showConfirmPassowrd}
                    value={values.password_confirmation}
                    onChangeText={handleChange("password_confirmation")}
                    onBlur={() => {
                      setFieldTouched("password_confirmation");
                      setConfirmPasswordFocused(false);
                    }}
                    onFocus={() => setConfirmPasswordFocused(true)}
                  />
                  {values.password_confirmation.length > 0 && (
                    <TouchableOpacity
                      onPress={togglePasswordConfirmVisibility}
                      style={styles.showHideIcon}
                    >
                      <FontAwesome
                        name={showConfirmPassowrd ? "eye-slash" : "eye"}
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  )}
                  {errors.password_confirmation &&
                    touched.password_confirmation && (
                      <Text style={styles.errorsTxt}>
                        {errors.password_confirmation}
                      </Text>
                    )}
                  </Animated.View>
                </View>

              <Animated.View style={styles.inputGroupBtn} entering={BounceInUp.delay(1000)}>
                <TouchableOpacity
                  style={styles.registerBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.registerBtnTxt}>Register</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
    </View>
  );
};

export default Register;