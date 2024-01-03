import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Pressable,
  Image,
  Alert,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { firebaseDb } from "../../firebaseConfig";
import HTML from "react-native-render-html";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./noteListStyle";
import { editNote } from "../store/addNoteSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import {
  scheduleNotificationForNote,
  registerForPushNotificationsAsync,
} from "../services/notiServices";
import  Moment  from "moment";
import { selectUser } from "../store/userSlice";
import moment from 'moment';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const NoteList = ({ navigation, searchText }) => {
  const [noteList, setNoteList] = useState([]);
  const [showDeleteButtonForItem, setShowDeleteButtonForItem] = useState(null);
  const [itemHeights, setItemHeights] = useState({});

  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const {userID} = useSelector(selectUser)

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };

  useEffect(() => {
    const getNoteList = onSnapshot(
      query(collection(firebaseDb, 'notes'), where('userID', '==', userID)),
      (snapshot) => {
        const sortedNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        sortedNotes.sort(
          (a, b) =>
            (b.created_at?.toDate() || 0) - (a.created_at?.toDate() || 0)
        );
        setNoteList(sortedNotes);
  
        sortedNotes.forEach((note) => {
          console.log(note.reminder_time);
          if (note.reminder_time) {
            scheduleNotificationForNote(
              note.reminder_time,
              note.title
            );
          }
        });
      }
    );
  
    return () => getNoteList();
  }, []);

  const handleNoteItemPress = (note) => {
    dispatch(
      editNote({
        id: note.id,
        title: note.title,
        note: note.note,
        imageUrl: note.image,
        created_at: note.created_at,
      })
    );
    navigation.navigate("AddNote");
  };

  const handleLongPress = (itemId) => {
    setShowDeleteButtonForItem(itemId);
  };

  const handleDeletePress = async (itemId) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteDoc(doc(firebaseDb, "notes", itemId));
              const updatedNoteList = noteList.filter(
                (item) => item.id !== itemId
              );
              setNoteList(updatedNoteList);
            } catch (error) {
              console.error("Error deleting note:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const windowWidth = useWindowDimensions().width;
  const itemWidth = (windowWidth - 30) / 2;

  const getItemHeight = (itemId) => {
    return itemHeights[itemId] || 0;
  };

  const getItemDynamicHeight = (itemId) => {
    const defaultHeight = 130;
    const textHeight = getItemHeight(itemId);
    const imageHeight = itemHeights[itemId + "_image"] || 0;
    return textHeight + imageHeight + defaultHeight;
  };

  const handleLayout = (e, itemId) => {
    const { height } = e.nativeEvent.layout;
    setItemHeights((prevHeights) => ({
      ...prevHeights,
      [itemId]: height,
    }));
  };

  const filteredNotes = noteList.filter((note) => {
    const titleMatches = note.title.toLowerCase().includes(searchText.toLowerCase());
    const contentMatches = note.note.toLowerCase().includes(searchText.toLowerCase());
    return titleMatches || contentMatches;
  });

  const EmptyListComponent = () => (
    <View >
      <Text style={{textAlign : "center", marginTop : '10%', opacity : 0.6}}>Click + to add notes</Text>
    </View>
  );

  const isToday = (date) => {
    const today = Moment().startOf('day');
    return Moment(date).isSame(today, 'day');
  };
  
  const isTomorrow = (date) => {
    const tomorrow = Moment().add(1, 'days').startOf('day');
    return Moment(date).isSame(tomorrow, 'day');
  };

  const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

  return (
    <FlatList
      data={filteredNotes}
      renderItem={({ item }) => (
        <Pressable
          onLongPress={() => handleLongPress(item.id)}
          onPress={() => handleNoteItemPress(item)}
          style={{ width: itemWidth }}
        >
          <View style={[styles.noteInfo, { height: getItemDynamicHeight(item.id) }]}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.noteImage}
                onLayout={(e) => handleLayout(e, item.id + "_image")}
              />
            )}

            <View style={styles.noteContent}>
              <Text style={styles.noteTitle}>{item.title}</Text>

              <View style={styles.notePara}>
                <HTML
                  source={{ html: truncateText(item.note, 25) }}
                  contentWidth={itemWidth}
                  ignoredDomTags={["input"]}
                  onLayout={(e) => handleLayout(e, item.id)}
                />
              </View>
            </View>
                  {item.reminder_date && item.reminder_time ? (
                  <View style={styles.noteReminderDate}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: "#0e153a", opacity: 0.6 }}>
                      {isToday(item.reminder_date)
                        ? 'Today, '
                        : isTomorrow(item.reminder_date)
                        ? 'Tmr, '
                        : Moment(item.reminder_date).format('MMM DD, ')}
                    </Text>
                    <Text style={{ fontSize: 6, opacity: 0.6 }}>
                      {item.reminder_time}
                    </Text>
                  </View>
                ) : null}

            <Text style={styles.noteDate}>
              {new Date(item.created_at?.toDate()).toLocaleString([], {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>

            {showDeleteButtonForItem === item.id && (
              <TouchableOpacity
                onPress={() => handleDeletePress(item.id)}
                style={styles.deleteButton}
              >
                <AntDesign name="delete" size={24} color="#ff304f" />
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListEmptyComponent={EmptyListComponent}
    />

  );
};

export default NoteList;