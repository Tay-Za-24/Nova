import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../screens/Profile/profileStyle"; // Import your styles if needed
import { ScreenHeight, ScreenWidth } from "../util/helper";

const ReasonList = ({ reasons }) => {
    console.log("Reasons inside" , reasons);
  const renderReasonItem = ({ item }) => {
    return (
      <View style={styles.reasonItem}>
        <Text style={{fontStyle : "italic", fontWeight : "bold", fontSize : 16}}>Did not complete {item.taskData} in time </Text>
        <Text style={styles.reason}>Reason - {item.reason}</Text>
      </View>
    );
  };

  const renderListEmptyComponent = () => (
    <View style={{justifyContent : "center", alignItems : "center", marginTop : '10%'}}>
        <Text style={{opacity : 0.6}}>Still no overdue tasks</Text>
    </View>
);

  return (
    <FlatList
        showsVerticalScrollIndicator = {false}
        style={{height : ScreenHeight * 0.32}}
        data={reasons}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderReasonItem}
        ListEmptyComponent={renderListEmptyComponent}
    />
  );
};

export default ReasonList;