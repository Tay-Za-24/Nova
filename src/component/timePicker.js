import React from 'react';
import { TimePickerModal } from 'react-native-paper-dates';

const TimePicker = ({ visible, onConfirm, onDismiss, label }) => {
  return (
    <TimePickerModal 
    locale="en" 
    visible={visible} 
    onConfirm={onConfirm} 
    onDismiss={onDismiss} 
    label={label} />
  );
};

export default TimePicker;