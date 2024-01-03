import React from 'react';
import { DatePickerModal } from 'react-native-paper-dates';

const DatePicker = ({ visible, onConfirm, onDismiss, label }) => {
  return (
    <DatePickerModal
      locale="en"
      visible={visible}
      mode="single"
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      label={label}
      presentationStyle="pageSheet"
    />
  );
};

export default DatePicker;