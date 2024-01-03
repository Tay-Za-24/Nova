import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Checkbox, List } from "react-native-paper";
import styles from "../../screens/Calendar/calendar.style";
import moment from "moment";
import { ScreenHeight, ScreenWidth } from "../../util/helper";
import { useSelector } from "react-redux";
import { selectDate } from "../../store/dateSlice";
import { isPastStartTime,isPastEndTime } from "../../util/helper";

const TaskList = ({ tasks, checkedTasks, checkBoxPress }) => {
  const { selectedDate } = useSelector(selectDate);

  const filteredTasks = tasks.filter((item) => item.date === selectedDate);

  const isToday = (date) => {
    const today = moment().startOf('day');
    return moment(date).isSame(today, 'day');
  };

  const isTomorrow = (date) => {
    const tomorrow = moment().add(1, 'days').startOf('day');
    return moment(date).isSame(tomorrow, 'day');
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.task}>
      <View style={{ marginRight: 10, borderRadius: 20, overflow: "hidden" }}>
        <Checkbox.Android
          status={checkedTasks[item.id] ? "checked" : "unchecked"}
          color= "#457b9d"
          onPress={() => checkBoxPress(item.id)}
        />
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              marginRight: ScreenWidth * 0.02,
              fontSize: 18,
              fontWeight: "bold",
              textDecorationLine:
                item.status === "done" ? "line-through" : "none",
            }}
          >
            {item.taskData}
          </Text>

          {item.priority === "First Priority" ? (
            <View style={styles.firstCircle}></View>
          ) : item.priority === "Second Priority" ? (
            <View style={styles.secondaryCircle}></View>
          ) : (
            <View style={styles.normalCircle}></View>
          )}
        </View>

        <Text style={{ opacity: 0.6 }}>
          {isToday(item.date)
            ? 'Today'
            : isTomorrow(item.date)
            ? 'Tomorrow'
            : moment(item.date).format("MMM D")} / {item.start} to {item.end}
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        style={{ height: ScreenHeight * 0.47 }}
        showsVerticalScrollIndicator={false}
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : "")}
        ListEmptyComponent={() => (
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasksText}>No tasks for the day</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskList;
