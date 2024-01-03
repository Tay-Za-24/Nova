import { Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./loginStyle";
import { Formik } from "formik";
import { LoginFormHandle } from "../../validation/loginFormHandle";
import { FontAwesome } from "@expo/vector-icons";

import { firebaseAuth } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { colors } from "../../util/color";
import Animated, { BounceInUp, Easing, FadeInLeft, FadeInRight, LightSpeedInLeft, LightSpeedOutLeft } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const Login = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false)
  const dispatch = useDispatch()
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user && user.uid) {
        dispatch(setUser(user.uid));
        navigation.replace("Main");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const FormSubmit = async (values, actions) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );

      if (userCredential) {
        const user = userCredential.user;
        console.log("User logged in:", user);
        navigation.navigate("Main");
      }
    } catch (error) {
      actions.setSubmitting(false);
      Alert.alert(
        "Login Failed",
        "Please check your email and password and try again."
      );
    }
  };
  
  return (
    <View style={{marginTop : '25%'}}>
      <ScrollView
        showsVerticalScrollIndicator = {false}
      >
          <Formik
          initialValues={form}
          enableReinitialize={true}
          validationSchema={LoginFormHandle}
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
                <View style={styles.header}>
                  <Text style={[styles.headerTlt, {color : colors.accent}]}>Welcome to </Text>
                  <Animated.Text style={[styles.headerTlt, { color: colors.tertiary }]} entering={FadeInRight.duration(1000).easing(Easing.ease)}>NOVA</Animated.Text>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.title}>Email</Text>
                  <Animated.View entering={LightSpeedInLeft.duration(400).easing(Easing.ease)}>
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
                        setFieldTouched("email"); 
                        setEmailFocused(false);}}
                      onFocus={() => setEmailFocused(true)} 
                    />
                  </Animated.View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorsTxt}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.title}>Password</Text>
                  <Animated.View entering={LightSpeedInLeft.duration(600).easing(Easing.ease)} >
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
                        setPasswordFocused(false)
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
                  </Animated.View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorsTxt}>{errors.password}</Text>
                  )}
                </View>


                <View style={styles.inputGroupBtn}>
                  <Animated.View entering={BounceInUp.delay(600)}>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                      <Text style={styles.loginBtnTxt}>Login</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View entering={BounceInUp.delay(800)}>
                  <TouchableOpacity
                    style={styles.registerBtn}
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                  >
                    <Text style={styles.registerBtnTxt}>Register</Text>
                  </TouchableOpacity>
                  </Animated.View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={{ color: "#f26d5b", textDecorationLine : 'underline' }}>Forgot Password?</Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
        </Formik>
      </ScrollView> 
    </View>
  );
};

export default Login;