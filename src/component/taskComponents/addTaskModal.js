import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../screens/Calendar/calendar.style';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../../store/taskSlice';
import { setPriority } from '../../store/taskSlice';

const AddTaskModal = ({ isVisible, onClose, onDateChange, onTaskInputChange, onDoneButtonPress }) => {
  const[priorityPickerVisible, setPriorityPickerVisible] = useState(false)
  const { start, priority, date } = useSelector(selectTasks);
  const inputRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const priorityPress = (priority) => {
      dispatch(setPriority(priority))
      setPriorityPickerVisible(false)
  }

  return (
    <Modal isVisible={isVisible} transparent={true} style={styles.addTaskModal} animationIn={"slideInUp"} animationOut={'slideInDown'}>
      <View style={styles.addTaskContainer}>
        <TextInput
          ref={inputRef}
          style={styles.addTaskBox}
          placeholder="Add New Task"
          onChangeText={onTaskInputChange}
        />

        <View style={{flexDirection : 'row'}}>
          <View style={{flexDirection : 'row', marginRight : start ? '3%' : '15%'}}>
            <Text style={{fontSize : 16}}>Date | {date}</Text>
          </View>
          <View style={{marginRight : start ? '3%' : '15%', flexDirection : 'row', alignItems : 'center'}}>
            <Ionicons name='alarm-outline' size={23}/>
            <Text> {start}</Text>
          </View>
        </View>

        <Modal isVisible={priorityPickerVisible} transparent={true} animationIn={'slideInUp'} style={styles.priorityPickerModal}>
          <View style={styles.priorityPicker}>
            <TouchableOpacity style={{paddingBottom : 20, flexDirection : 'row'}} onPress={() => priorityPress('First Priority')}>
              <Text style={{color : 'crimson'}}>First Priority</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingBottom : 20}} onPress={() => priorityPress('Second Priority')}>
              <Text style={{color : 'orange'}}>Second Priority</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => priorityPress('Normal Priority')}>
              <Text style={{color : 'lightblue'}}>Normal Priority</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity style={styles.addCategoryBtn} onPress={() => setPriorityPickerVisible(true)}>
            <Text style={{ color: 'white' }}>{priority}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDateChange} style={styles.addCategoryBtn}>
            <Ionicons name="calendar-outline" size={20} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDoneButtonPress} style={[styles.addCategoryBtn]}>
            <Text style={{ color: 'white' }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.addCategoryBtn}>
            <Text style={{ color: 'white' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
