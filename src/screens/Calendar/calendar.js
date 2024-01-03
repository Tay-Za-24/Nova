import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Alert, TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskStartTime, setTaskEndTime, selectTasks, updateStatus, resetTaskState, setDate } from '../../store/taskSlice';
import HorizontalCalendar from '../../component/taskComponents/horizontalCalendar';
import AddTaskModal from '../../component/taskComponents/addTaskModal';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './calendar.style';
import { getTasks, postTask, postCompletedTask, getTaskById, deleteTask, getDataToCompare } from '../../services/taskService';
import { ActivityIndicator, SegmentedButtons } from 'react-native-paper';
import * as Notifications from "expo-notifications";
import { scheduleNotificationBeforeTask, registerForPushNotificationsAsync } from '../../services/notiServices';
import TaskList from '../../component/taskComponents/taskList';
import CompletedTaskList from '../../component/taskComponents/completedTaskList';
import useDateTimePicker from '../../hooks/custom/useDateTImePicker';
import DatePicker from '../../component/datePicker';
import TimePicker from '../../component/timePicker';
import moment from 'moment';
import { selectUser } from '../../store/userSlice';
import { ScreenHeight } from '../../util/helper';
import ReasonModal from '../../component/taskComponents/reasonModal';
import Animated, { BounceInDown, Easing, FadeInUp } from 'react-native-reanimated';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Calendar = () => {
  const {
    isDatePickerVisible,
    showDatePicker,
    hideDateTimePicker,
    showStartTimePicker,
    showEndTimePicker,
    showEndPicker,
    showStartPicker
  } = useDateTimePicker();
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [taskTextInput, setTaskTextInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const { start, end, status, date, priority } = useSelector(selectTasks);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { userID } = useSelector(selectUser)
  const [checkedTasks, setCheckedTasks] = useState({});
  const [reasonModalVisible, setReasonModalVisible] = useState(false)
  const [reason, setReason] = useState('')
  const [overdueTaskData, setOverDueTaskData] = useState({})
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, [modalVisible]);
  
  const init = async () => {
    
    await registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    const unsubscribe = getTasks(userID, (updatedTasks) => {
      setTasks(updatedTasks);
    
      updatedTasks.forEach((task) => {
        const { start, taskData, priority } = task;
        if (start) {
          scheduleNotificationBeforeTask(start, taskData, priority);
        }
      });
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe();
    };
  };

  const checkBoxPress = async (taskId) => {
    try {
      // Fetch overdue task data
      const overdueTaskData = await getDataToCompare(taskId);
      
      // Set overdueTaskData immediately after fetching
      setOverDueTaskData(overdueTaskData);
  
      console.log(overdueTaskData);
      console.log(moment(overdueTaskData.Date));
  
      const doneTime = moment();
      const currentDate = doneTime.format('YYYY-MM-DD');
      const newCheckedTasks = { ...checkedTasks };
      const taskStartDate = moment(overdueTaskData.Date);
      newCheckedTasks[taskId] = !newCheckedTasks[taskId];
      setCheckedTasks(newCheckedTasks);
  
      if (moment(currentDate).isAfter(taskStartDate)) {
        setReasonModalVisible(true);
      }
  
      dispatch(updateStatus(taskId));
      
      const updatedTask = await getTaskById(taskId, userID);
  
      if (updatedTask && updatedTask.status === 'done') {
        try {
          await postCompletedTask({
            userID,
            fromerId: taskId,
            taskData: updatedTask.taskData,
            start: updatedTask.start,
            end: updatedTask.end,
            date: updatedTask.date,
            status: updatedTask.status,
          });
  
          await deleteTask(taskId);
        } catch (error) {
          console.error('Error posting completed task to Firestore:', error);
        }
      }
  
    } catch (error) {
      console.error('Error fetching overdue task data:', error);
    }
  };


  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = Moment(selectedDate.date).format('YYYY-MM-DD');
      dispatch(setDate(formattedDate));
      hideDateTimePicker();
      showStartTimePicker();
    }
  };

  const handleStartTime = (time) => {
    console.log(time);
    if (time !== undefined) {
      const formattedTime = Moment(time).format('hh:mm A');
      dispatch(setTaskStartTime(formattedTime));
      hideDateTimePicker();
      showEndTimePicker();
    }
  };

  const handleEndTime = (time) => {
    console.log(time);
    if (time !== undefined) {
      const formattedTime = Moment(time).format('hh:mm A');
      if (start && formattedTime < start) {
        console.log(start > time);
        Alert.alert('Error', 'End time cannot be before the start time');
      } else {
        dispatch(setTaskEndTime(formattedTime));
      }
      hideDateTimePicker();
    }
  };

  const handleTaskInputChange = (text) => {
    setTaskTextInput(text);
  };

  const handleDoneButtonPress = async () => {
    setModalVisible(false);
    if (taskTextInput.trim() !== '') {
      const taskDataToPost = {
        userID,
        taskData: taskTextInput,
        start,
        end,
        status,
        date,
        priority,
      };
      await postTask(taskDataToPost);
      dispatch(resetTaskState());
    } else {
      Alert.alert('Task data is required to post.');
    }
  };

  const handleModalClose = () => {
    hideDateTimePicker();
    setTaskTextInput('');
    dispatch(resetTaskState());
  };

  const handleReason = (text) => {
    setReason(text)
  }

  return (
    <View>
        <Animated.View entering={FadeInUp.duration(500).easing(Easing.ease)}>
          <HorizontalCalendar/>
        </Animated.View>
        <View style={styles.taskContainer}>
          <SegmentedButtons
            style={{ marginBottom: '5%' }}
            value={value}
            onValueChange={(newValue) => setValue(newValue)}
            buttons={[
              {
                value: 0,
                label: 'Scheduled Reminders',
                labelStyle: { fontSize: 12, fontWeight: 'bold' },
                checkedColor: '#8A63E6',
              },
              {
                value: 1,
                label: 'Completed Tasks',
                labelStyle: { fontSize: 12, fontWeight: 'bold' },
                checkedColor: '#8A63E6',
              },
            ]}
          />

          <DatePicker visible={isDatePickerVisible} onConfirm={handleDateChange} onDismiss={hideDateTimePicker} />

          <TimePicker visible={showStartPicker} onConfirm={handleStartTime} onDismiss={hideDateTimePicker} label="Select Start Time for your task" />
          <TimePicker visible={showEndPicker} onConfirm={handleEndTime} onDismiss={hideDateTimePicker} label="Selecet End Time for your task" />

          
          {value === 0 ? (
            <TaskList tasks={tasks} checkedTasks={checkedTasks} checkBoxPress={checkBoxPress} />
          ) : (
            <CompletedTaskList />
          )}
          <Animated.View style={styles.addTaskButton} entering={BounceInDown}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="add-outline" color={'white'} size={30} />
            </TouchableOpacity>
          </Animated.View>

          <AddTaskModal
            isVisible={modalVisible}
            onClose={() => {
              setModalVisible(false);
              handleModalClose();
            }}
            onDateChange={() => showDatePicker()}
            onTaskInputChange={handleTaskInputChange}
            onDoneButtonPress={handleDoneButtonPress}
          />

            <ReasonModal
              data={overdueTaskData.taskData}
              isVisible={reasonModalVisible}
              onClose={() => setReasonModalVisible(false)}
            />  
        </View>
    </View>
  );
};

export default Calendar;