import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert, Modal, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getFirestore, collection, getDocs, deleteDoc, doc, where, query, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

const AudioList = ({ navigation }) => {
  const [audioData, setAudioData] = useState([]);
  const firebaseDb = getFirestore(firebaseApp);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const ScreenHeight = Dimensions.get('window').height;
  const {userID} = useSelector(selectUser)

  useEffect(() => {
    const audioCollectionRef = collection(firebaseDb, 'audios');
    const audioQuery = query(audioCollectionRef, where('userID', '==', userID));
    
    const unsubscribe = onSnapshot(audioQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedAudioData = data.sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
      );
      setAudioData(sortedAudioData);

      console.log('Timestamps:', sortedAudioData.map(item => item.timestamp));
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const handlePlayAudio = async (uri, title) => {
    navigation.navigate('AudioPlayer', { uri, title });
  };

  const handleLongPress = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleDeleteIconPress = (itemId) => {
    setSelectedItemId(itemId);
    setDeleteAlertVisible(true);
  };

  const handleDeleteAudio = async () => {
    try {
      await deleteDoc(doc(firebaseDb, 'audios', selectedItemId));
      const updatedAudioData = audioData.filter(item => item.id !== selectedItemId);
      setAudioData(updatedAudioData);
      setDeleteAlertVisible(false);
      setSelectedItemId(null);
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };

  const handleOKPress = async () => {
    await handleDeleteAudio();
  };


  const renderItem = ({ item }) => {
  const formattedTimestamp = new Date(item.timestamp).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePlayAudio(item.uri, item.title)}
      onLongPress={() => handleLongPress(item.id)}
    >
      <View style={styles.itemContent}>
        <AntDesign name="play" size={24} color="black" style={styles.playIcon} />
        <Text style={styles.audioTitle}>{item.title}</Text>
        <Text style={styles.audioTimestamp}>
          ({formattedTimestamp})
        </Text>
        <View style={styles.deleteButtonContainer}>
          {selectedItemId === item.id && (
            <TouchableOpacity onPress={() => handleDeleteIconPress(item.id)}>
              <AntDesign name="delete" size={24} color="red" style={styles.deleteIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const renderEmptyListComponent = () => (
  <View style={{opacity : 0.6, alignItems : 'center', marginTop : '10%'}}>
    <Text>Click + to add recordings</Text>
  </View>
);


return (
    <View>
      <FlatList
        data={audioData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyListComponent}
      />

      <Modal visible={deleteAlertVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.deleteAlert}>
              <Text>Are you sure you want to delete this audio?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteAlertVisible(false)}>
                  <Text style={{ color: 'white' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleOKPress}>
                  <Text style={{ textAlign: 'center', color: 'white' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIcon: {
    marginRight: 15,
  },
  audioTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  audioTimestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
  },
  deleteButtonContainer: {
    marginLeft: 'auto',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  deleteAlert: {
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
});


export default AudioList;