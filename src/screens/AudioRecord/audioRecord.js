import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import {Feather, Ionicons, AntDesign} from '@expo/vector-icons';
import { styles } from  './audioRecordStyle';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { firebaseApp, firebaseDb } from '../../../firebaseConfig';
import  { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';

const AudioRecord = ({ navigation }) => {
  const storage = getStorage(firebaseApp);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioURI, setAudioURI] = useState(null);
  const [audioTitle, setAudioTitle] = useState('');
  const [savedAudioList, setSavedAudioList] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioPosition, setAudioPosition] = useState(0);
  const [opacityValue] = useState(new Animated.Value(1));
  const [duration, setDuration] = useState(0);
  const durationIntervalRef = useRef(null);
  const {userID} = useSelector(selectUser)


    useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 100);
      }, 100);
    } else {
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [isRecording]);


  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, [recording]);

    useEffect(() => {
    getAudioDuration();
  }, [audioURI]);

    const startRecordingAnimation = () => {
    Animated.loop(
      Animated.timing(
        opacityValue,
        {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();
  };

  const stopRecordingAnimation = () => {
    Animated.timing(
      opacityValue,
      {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();
  };

  useEffect(() => {
    if (isRecording) {
      startRecordingAnimation();
    } else {
      stopRecordingAnimation();
    }
  }, [isRecording]);

    const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const getAudioDuration = async () => {
    try {
      if (audioURI) {
        const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
        const { durationMillis } = await sound.getStatusAsync();
        const durationSeconds = durationMillis / 1000;
        setAudioDuration(durationSeconds);
      }
    } catch (error) {
      console.error('Error getting audio duration:', error);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to record audio denied');
        return;
      }

      if (recording && recording._finalStatus !== 'ended') {
        console.log('Recording already in progress');
        return;
      }

      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingObject.startAsync();
      setRecording(recordingObject);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

const stopRecording = async () => {
  try {
    if (recording && recording.getStatusAsync) {
      const status = await recording.getStatusAsync();
      if (status.isRecording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        const uri = recording.getURI();
        setAudioURI(uri);
        console.log('Audio recorded at:', uri);
      } else {
        console.log('Recording is not in progress');
      }
    } else {
      console.log('No recording found to stop');
    }
  } catch (error) {
    console.error('Error stopping recording:', error);
  }
};

  const saveRecordedAudio = async () => {
    if (audioURI && audioTitle) {
      try {
        const storageRef = ref(storage, `audio/${audioTitle}`);

        const response = await fetch(audioURI);
        const blob = await response.blob();
        const snapshot = await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(snapshot.ref);
        const timestamp = new Date().toISOString();

        const audioData = {
          title: audioTitle,
          uri: downloadURL,
          timestamp: new Date().toISOString(),
          userID
        };

        const audioCollection = collection(firebaseDb, 'audios');
        await addDoc(audioCollection, audioData);

        setSavedAudioList([...savedAudioList, audioData]);
        setAudioTitle('');
        setAudioURI(null);
        console.log('Audio saved to Firestore and Storage:', audioData);
        navigation.navigate('Home', { selectedCategory: 'Recordings' });
      } catch (error) {
        console.error('Error saving audio:', error);
      }
    } else {
      console.log('Please provide a title and record audio before saving.');
    }
  };

const playRecordedAudio = async () => {
  try {
    if (audioURI) {
      let playback;
      if (playbackObject) {
        if (isPlaying) {
          await playbackObject.pauseAsync();
        } else {
          await playbackObject.playAsync();
        }
        setPlaybackObject(playbackObject);
      } else {
        playback = new Audio.Sound();
        await playback.loadAsync({ uri: audioURI });
        await playback.playAsync();
        playback.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setPlaybackObject(playback);
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log('No recorded audio to play');
    }
  } catch (error) {
    console.error('Error playing/pausing recorded audio:', error);
  }
};


  const onPlaybackStatusUpdate = async (status) => {
    if (status.isPlaying) {
      setAudioPosition(status.positionMillis);
    } else {
      setAudioPosition(0);
    }
  };

    const cancelRecording = () => {
    if (recording) {
      stopRecording();
    }

    setIsRecording(false);
    setRecording(null);
    setAudioURI(null);
    setAudioTitle('');
    setTimer(0);
    setIsPlaying(false);
    setPlaybackObject(null);

    navigation.navigate('Home');
  };


  return (
     <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home"); }}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
        <Text style={styles.headerTxt}>Voice Recording</Text>
      </View>

       <View style={styles.recordControl}>
         <TouchableOpacity style={styles.recordButton} onPress={isRecording ? stopRecording : startRecording}>
           <Animated.View style={{ opacity: opacityValue }}>
             <Ionicons name={isRecording ? 'mic-off' : 'mic'} size={48} color="black" />
           </Animated.View>
        </TouchableOpacity>
       </View>

       {isRecording && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}> {formatTime(timer)}</Text>
          </View>
      )}

      <TextInput
        placeholder="Enter Audio Title"
        value={audioTitle}
        onChangeText={(text) => setAudioTitle(text)}
        style={styles.input}
      />


    {audioURI && (
      <View style={styles.audioPlay}>
        <TouchableOpacity onPress={playRecordedAudio}>
          <AntDesign name={isPlaying ? "pausecircle" : "play"} size={35} color="black" />
        </TouchableOpacity>
          <Text style={styles.durationText}>{formatTime(audioDuration * 1000 - audioPosition)}</Text>
      </View>
    )}


      <View style={styles.addBtnContainer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={cancelRecording}>
          <Text style={styles.addBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={saveRecordedAudio}>
          <Text style={styles.addBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default AudioRecord;

// import { View, Text } from 'react-native'
// import React from 'react'

// const AudioRecord = ({ navigation }) => {
//   return (
//     <View>
//       <Text>audioRecord</Text>
//     </View>
//   )
// }

// export default AudioRecord