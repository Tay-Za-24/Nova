import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../screens/Calendar/calendar.style';
import { postReasons } from '../../services/reasonServices';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';

const ReasonModal = ({ isVisible, onClose, data }) => {
  const [reason, setReason] = useState('');
  const [isReasonEmpty, setIsReasonEmpty] = useState(true); // Added state to track if the reason is empty
  const { userID } = useSelector(selectUser);

  const handleReason = (text) => {
    setReason(text);
    setIsReasonEmpty(text.trim().length === 0); // Update isReasonEmpty based on text length
  };

  const handleDoneButtonPress = () => {
    reasonUpload(reason);
    setReason('');
    onClose();
  };

  const reasonUpload = async () => {
    try {
      await postReasons({ reason, taskData: data, userID });
    } catch (error) {
      console.error('Error posting reasons:', error);
    }
  };

  return (
    <Modal isVisible={isVisible} animationIn={'fadeIn'} animationOut={'fadeOut'} onBackdropPress={onClose}>
      <View style={styles.reasonModal}>
        <Text style={{ fontStyle: 'italic', color: 'crimson', fontWeight : 'bold', fontSize : 17}}>You finished your task past the due date</Text>
        <Text>Add a brief reason why you couldn't finish it.</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Your Reason"
            style={styles.reasonBox}
            onChangeText={handleReason}
          />
          <TouchableOpacity
            style={[
              styles.addReasonBtn,
              { backgroundColor: isReasonEmpty ? 'grey' : 'green' }, // Adjust background color based on isReasonEmpty
            ]}
            onPress={isReasonEmpty ? null : handleDoneButtonPress} // Disable onPress if isReasonEmpty
            disabled={isReasonEmpty}
          >
            <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReasonModal;
