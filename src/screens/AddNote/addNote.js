import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import { styles } from "./addNoteStyle";
import { useDispatch, useSelector } from "react-redux";
import {resetAddNoteState} from "../../store/addNoteSlice";
import { selectAddNote } from '../../store/addNoteSlice';
import { Entypo, Feather, AntDesign, Ionicons, FontAwesome5, MaterialCommunityIcons,Fontisto } from "@expo/vector-icons";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { firebaseDb } from "../../../firebaseConfig";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';
import useDateTimePicker from "../../hooks/custom/useDateTImePicker";
import DatePicker from '../../component/datePicker';
import TimePicker from '../../component/timePicker';
import  Moment  from "moment";
import * as Notifications from "expo-notifications";
import { selectUser } from "../../store/userSlice";

const AddNote = ({ navigation }) => {
  const noteEditorRef = useRef(null);

  const noteInfo = useSelector(selectAddNote);

  const dispatch = useDispatch();
  const [title, setTitle] = useState(noteInfo.title || '');
  const [note, setNote] = useState(noteInfo.note || '');
  const [imageUrl, setImageUrl] = useState(noteInfo.imageUrl || null);

  const [showImage, setShowImage] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const {userID} = useSelector(selectUser)

  const {
    isDatePickerVisible,
    showDatePicker,
    hideDateTimePicker,
    showStartTimePicker,
    showEndTimePicker,
    showEndPicker,
    showStartPicker
  } = useDateTimePicker();


  useEffect(() => {
    if (noteInfo && noteInfo.title !== "") {
      setTitle(noteInfo.title || "");
      setNote(noteInfo.note || "");
      setImageUrl(noteInfo.imageUrl || null);
      setIsEditing(true);
    } else {
      dispatch(resetAddNoteState()); 
    }
  }, [noteInfo]);
  
  
  useEffect(() => {
    return () => {
      dispatch(resetAddNoteState());
    };
  }, []);
  

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = Moment(selectedDate.date).format('YYYY-MM-DD');
      setSelectedDate(formattedDate)
      hideDateTimePicker();
      showStartTimePicker();
    }
  };

  const handleEndTime = (time) => {
    console.log(time);
    if (time !== undefined) {
      const formattedTime = Moment(time).format('hh:mm A');
      setSelectedEndTime(formattedTime)
      hideDateTimePicker();
      showEndTimePicker();
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };
  
  const handleNoteChange = (text) => {
    dispatch(setNote(text)); 
  };

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission to access camera roll is required!");
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!pickerResult.canceled) {
        const { uri } = pickerResult.assets?.[0] || {};
        if (uri) {
          setImageUrl(uri)
        }
      }
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl('')
    setShowImage(false); 
  };
  
  const uploadImageToStorage = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${new Date().toISOString()}`);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const snapshot = await uploadString(storageRef, blob);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading image to storage:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (imageUrl) {
        setImageUrl(await uploadImageToStorage())
      }
      const noteObject = {
        title,
        note,
        image: imageUrl,
        created_at: serverTimestamp(),
        reminder_date: selectedDate ? Moment(selectedDate).format('YYYY-MM-DD') : null,
        reminder_time: selectedEndTime ,
        userID,
      };

      console.log("selected Time " , selectedEndTime);
  
      if (isEditing) {
        const { id } = noteInfo;
        await setDoc(doc(firebaseDb, "notes", id), noteObject);
      } else {
        await addDoc(collection(firebaseDb, "notes"), noteObject);
      }

       if (selectedDate && selectedEndTime) {
        const trigger = new Date(selectedDate + " " + selectedEndTime);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: "Don’t forget about your note!",
          },
          trigger,
        });
      }
  
      dispatch(resetAddNoteState());
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <View style={styles.headerIconLeft}>
          <TouchableOpacity onPress={() => { navigation.navigate("Home"); }}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerIconRight}>
        <TouchableOpacity onPress={() => showDatePicker()}>
          <FontAwesome5 name="calendar-check" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePick}>
          <Entypo name="folder-images" size={26} color="black" />
        </TouchableOpacity>
      </View>
      </View>
        <View style={styles.horizontalLine} />
      <RichToolbar
        getEditor={() => noteEditorRef.current}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.checkboxList,
          actions.undo,
          actions.redo,
          actions.insertLink,
        ]}
        style={styles.toolbar}
    />
    
    <View style={styles.dateTimeContainer}>
      <View style={{flexDirection: "row"}}>
        <Fontisto name="date" size={18} color="#0d1b2a" />
        {selectedDate && (
        <Text style={styles.dateTimeText}>  {selectedDate}</Text>
        )}
      </View>
      <View style={{flexDirection: "row"}}>
        <MaterialCommunityIcons name="clipboard-text-clock" size={20} color="#495057"  />
        {selectedEndTime && (
            <Text style={styles.dateTimeText}>  {selectedEndTime}</Text>
        )}
      </View>
    </View>

      <View style={{ position: 'relative' }}>
        {showImage && imageUrl && (
          <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={handleRemoveImage} style={styles.removeImageButton}>
              <Ionicons name="close-circle" size={24} color="#2b2727" />
            </TouchableOpacity>
            <Image source={{ uri: imageUrl }} style={styles.inputImg} />
          </View>
        )}
      </View>

      <View style={{marginTop: 15,}}>
        <TextInput
          style={[styles.inputTtl, { backgroundColor: "#fff" }]}
          onChangeText={handleTitleChange}
          value={title}
          placeholder="Enter title"
          multiline={true}
        />
      </View>
      <RichEditor
        ref={noteEditorRef}
        style={[styles.inputNote, { backgroundColor: "#fff", color: " #333" }]}
        onChange={handleNoteChange}
        initialContentHTML={note}
        placeholder="Enter note"
      />

      <View style={ styles.addBtnStyle }>
        <TouchableOpacity style={styles.addBtn} onPress={handleSave}>
          <Text style={styles.addBtnText}>{isEditing ? "Save" : "Add"}</Text>
        </TouchableOpacity>
      </View>
      
      <DatePicker visible={isDatePickerVisible} onConfirm={handleDateChange} onDismiss={hideDateTimePicker} />
      <TimePicker visible={showStartPicker} onConfirm={handleEndTime} onDismiss={hideDateTimePicker} label="Selecet Time to revisit your note" />

    </View>
  );
};

export default AddNote;