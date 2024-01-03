import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import Moment from 'moment';

export async function scheduleNotificationBeforeTask(startTime, taskData, priority) {
  try {
    console.log('inside');
    const notificationTime = Moment(startTime, 'hh:mm A').subtract(5, 'minutes');
    const title = priority === 'Normal Priority' ? 'Task Reminder' : `${priority} Task Reminder`;
    const notificationContent = {
      title: title,
      body: `Your task "${taskData}" is starting soon`,
      data: { taskData },
    };

    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const notificationsToCancel = scheduledNotifications.filter(
      (notification) => notification.content.data.taskData === taskData
    );

    notificationsToCancel.forEach(async (notification) => {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    });

    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        repeats: false,
        date: notificationTime.toDate(),
      },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}
  
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'bebd4d48-9451-41da-8216-8512071311a9' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export async function scheduleNotificationForNote(time, noteTitle) {
  console.log(time);
  try {
    const notificationTime = Moment(time, 'hh:mm A').subtract(5, 'minutes');
    const notificationContent = {
      title: "Note Notification",
      body: `Reminder to revisit the note - "${noteTitle}"`,
      data: { noteTitle },
    };

    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const notificationsToCancel = scheduledNotifications.filter(
      (notification) => notification.content.data.noteTitle === noteTitle
    );

    notificationsToCancel.forEach(async (notification) => {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    });

    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        repeats: false,
        date: notificationTime.toDate(),
      },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}
