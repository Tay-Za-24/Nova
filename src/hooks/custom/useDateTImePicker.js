import { useState } from 'react';

const useDateTimePicker = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDatePickerVisible(false);
    setShowStartPicker(false);
    setShowEndPicker(false);
  };

  const showStartTimePicker = () => {
    setIsDatePickerVisible(false);
    setShowStartPicker(true);
  };

  const showEndTimePicker = () => {
    setShowStartPicker(false);
    setShowEndPicker(true);
  };

  return {
    isDatePickerVisible,
    showDatePicker,
    hideDateTimePicker,
    showStartTimePicker,
    showEndTimePicker,
    showStartPicker,
    showEndPicker,
  };
};

export default useDateTimePicker;