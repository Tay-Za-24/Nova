import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getCompletedTasks, deleteCompletedTasks } from '../../services/taskService';
import Modal from 'react-native-modal';
import styles from '../../screens/Calendar/calendar.style';
import { ScreenHeight, ScreenWidth } from '../../util/helper';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import Animated, { BounceIn, BounceInDown } from 'react-native-reanimated';

const CompletedTaskList = () => {
  const [completedList, setCompletedList] = useState([]);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const { userID } = useSelector(selectUser)

  useEffect(() => {
    console.log(userID);
    const completedTasksUnsubscribe = getCompletedTasks(userID, (completedTasks) => {
      setCompletedList(completedTasks);
    });
  
    return () => {
      completedTasksUnsubscribe();
    };
  }, []);

  // const handleOKPress = () => {
  //   setShowEmptyList(true)
  //   setDeleteAlertVisible(false);
  // };

  const handlePress = () => {
    deleteCompletedTasks(),
    setDeleteAlertVisible(false)
  }

  const renderTaskItem = ({ item }) => (
    <View style={[styles.task, { opacity: 0.7 }]}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: 'line-through' }}>
          {item.taskData}
        </Text>

        <Text>{item.date}</Text>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{opacity : 0.6, fontSize : 16}}>No tasks completed</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        style={{height : ScreenHeight * 0.47}}
        showsVerticalScrollIndicator={false}
        data={completedList}
        renderItem={renderTaskItem}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : '')}
        ListEmptyComponent={ListEmptyComponent} 
      />
      <Animated.View entering={BounceInDown}  style={[styles.addTaskButton, { position: 'absolute', top: 400, left: ScreenWidth * 0.05 }]} >
      <TouchableOpacity
        onPress={() => setDeleteAlertVisible(true)}>
        <Ionicons name='trash-outline' size={30} color={'white'} />
      </TouchableOpacity>
      </Animated.View>

      <Modal visible={deleteAlertVisible} style={{justifyContent : 'center', alignItems : 'center'}}>
        <View style={styles.deleteAlert} >
          <Text style={{fontSize : 15, fontWeight : 'bold', color : 'crimson'}}>Deleting Completed Tasks</Text>
          <Text style={{marginTop : '5%'}}>This will also affect your progress page. Proceed?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: ScreenHeight * 0.02 }}>
            <TouchableOpacity style={styles.addCategoryBtn} onPress={() => setDeleteAlertVisible(false)}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteTaskBtn} onPress={handlePress}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CompletedTaskList;