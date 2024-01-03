import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./profileStyle";
import { firebaseAuth, firebaseDb } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { EvilIcons } from "@expo/vector-icons";
import { getCompletedTaskCount, getCompletedTaskCountByDate, getCompletedTaskDates, getPendingTaskCount } from '../../services/taskService';
import { BarChart } from "react-native-gifted-charts";
import { ScreenHeight, ScreenWidth, getDaysOfWeek } from '../../util/helper';
import { getReasons } from "../../services/reasonServices";
import ReasonList from "../../component/reasonList";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import Animated, { Easing, FadeInRight, SlideInRight } from "react-native-reanimated";
import Ionicons from 'react-native-vector-icons/Ionicons';
const daysOfWeekArray = getDaysOfWeek();

const Profile = ({ navigation }) => {
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completedTaskCount, setCompletedTaskCount] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState(daysOfWeekArray);
  const [reasons, setReasons] = useState([]);
  const [registeredUsername, setRegisteredUsername] = useState('');
  const { userID } = useSelector(selectUser);

  const currentTime = new Date().getHours();
  let greeting;
  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good Morning, ';
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = 'Good Afternoon, ';
  } else {
    greeting = 'Good Evening, ';
  }

  const barData = daysOfWeek.map(day => ({
    value: day.count,
    label: day.day,
    sideColor: '#23A7F3',
    topColor: '#92e6f6'
  }));

  useEffect(() => {
    const unsubscribeReasons = getReasons(userID, (updatedReasons) => {
      setReasons(updatedReasons);
    });

    const unsubscribeCompletedTasks = getCompletedTaskCount(userID, (count) => {
      setCompletedTasks(count);
    });

    const unsubscribePendingTasks = getPendingTaskCount(userID, (count) => {
      setPendingTasks(count);
    });

    const unsubscribeCompletedTaskDates = getCompletedTaskDates(userID, (dates) => {
      const fetchDataAndUpdate = async () => {
        try {
          const countsArray = await getCompletedTaskCountByDate(dates);
          setCompletedTaskCount(countsArray);
        } catch (error) {
          console.error('Error fetching and updating completed task counts: ', error);
        }
      };

      fetchDataAndUpdate();
    });

    return () => {
      unsubscribeReasons();
      unsubscribeCompletedTasks();
      unsubscribePendingTasks();
      unsubscribeCompletedTaskDates();
    };
  }, []);

  const fetchData = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        const userDocRef = doc(firebaseDb, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const usernameFromFirestore = userData.name;
          setRegisteredUsername(usernameFromFirestore);
          console.log('Username from Firestore:', usernameFromFirestore);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("This");
      console.error('Error fetching data: ', error);
      setLoading(false);
    }
  };

  const updateDaysOfWeek = (completedTaskCount) => {
    const updatedDaysOfWeek = daysOfWeek.map((day) => {
      const matchingCompletedTask = completedTaskCount.find((completedTask) => day.date === completedTask.date);

      if (matchingCompletedTask) {
        return { ...day, count: matchingCompletedTask.count };
      }

      return day;
    });

    setDaysOfWeek(updatedDaysOfWeek);
  };

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (completedTaskCount.length > 0) {
      updateDaysOfWeek(completedTaskCount);
      setLoading(false);
    }
  }, [completedTaskCount]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <ActivityIndicator style={styles.activityIndicator} size="large" color='#457b9d' />
        </View>
      ) : (
        <>
          <View style={styles.headerUser}>
            <TouchableOpacity style={styles.imgProfile}>
              <Ionicons name="person-circle-outline" size={70}/>
            </TouchableOpacity>
            <View style={styles.headerUserTtl}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerUserTtl01}>{greeting}</Text>
                <Text style={styles.headerUserTtl02}>{registeredUsername}</Text>
              </View>
              <View style={styles.headerUserTtl02Container}>
                <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                  <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '5%' }}>Task Overview</Text>
          <Animated.View style={styles.graphContainer} entering={SlideInRight.duration(300).easing(Easing.ease)}>
            <BarChart
              height={ScreenHeight * 0.16}
              width={ScreenWidth * 0.78}
              data={barData}
              frontColor={'#83b0e1'}
              barBorderTopLeftRadius={5}
              barBorderTopRightRadius={5}
              noOfSections={2}
              maxValue={10}
              barWidth={ScreenWidth * 0.06}
              isThreeD
              isAnimated
            />
            <View style={{ flexDirection: "row", marginLeft: ScreenWidth * 0.1, marginTop: '3%' }}>
              <Text style={{ marginRight: '7%', opacity: 0.6, fontWeight: 'bold' }}>Completed Tasks - {completedTasks}</Text>
              <Text style={{ opacity: 0.6, fontWeight: "bold" }}>Pending Tasks - {pendingTasks}</Text>
            </View>
          </Animated.View>
          <View style={styles.overdueTaskContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Overdue Tasks</Text>
            <ReasonList reasons={reasons} />
          </View>
        </>
      )}
    </View>
  );
};

export default Profile;
