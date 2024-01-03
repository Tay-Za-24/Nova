import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';

const AudioPlayer = ({ navigation, route }) => {
  const { uri, title } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (sound && isPlaying) {
        const status = await sound.getStatusAsync();
        setPosition(status.positionMillis);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(
          spinAnim,
          {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true
          }
        )
      ).start();
    } else {
      spinAnim.stopAnimation();
    }
  }, [isPlaying]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const loadAudio = async () => {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync({ uri }, {}, updateStatus);
      setSound(audioSound);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const updateStatus = async (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
        console.log('Sound paused');
      } else {
        await sound.playAsync();
        console.log('Sound played');
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const handleSeek = async (value) => {
    if (!sound) return;

    await sound.setPositionAsync(value);
    setPosition(value);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

    return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.cdContainer}>
        <Animated.Image
          source={{
            uri:
              'https://e7.pngegg.com/pngimages/643/591/png-clipart-cd-cd-vinyl-records-thumbnail.png',
          }}
          style={{...styles.cdImage, transform: [{rotate: spin}]}}
        />

      </View>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.timeText}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={handleSeek}
        disabled={!sound}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#007AFF"
      />

      <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
        <Text style={styles.controlButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    marginTop: 30,
    alignSelf: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
    marginTop: 20,
    color: '#555',
  },
  slider: {
    width: '100%',
    marginTop: 20,
  },
  cdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cdImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ccc',
  },
  playPauseButton: {
    marginLeft: 20,
  },
});

export default AudioPlayer;