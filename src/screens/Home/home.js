import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./homeStyle";
import { colors } from "../../util/color";
import { Ionicons } from "react-native-vector-icons";
import NoteList from "../../component/noteList";
import AudioList from "../../component/audioList";
import FloatingButton from "../../component/floatingButton";

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Notes");

  const onChangeText = (text) => {
    setSearchText(text);
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection : "row"}}>
          <Text style={styles.headerTitle}>My </Text>
          <Text style={[styles.headerTitle, {color : colors.accent}]}>{selectedCategory}</Text>
        </View>
        <View style={styles.headerSearch}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={searchText}
            placeholder="Search notes..."
            placeholderTextColor={colors.grey}
          />
          <Ionicons
            name="search"
            size={24}
            color={colors.grey}
            style={styles.searchIcon}
          />
        </View>
      </View>

      <View style={styles.category}>
        <TouchableOpacity onPress={() => changeCategory("Notes")}>
          <Text
            style={
              selectedCategory === "Notes"
                ? [styles.categoryText, styles.selectedCategory]
                : styles.categoryText
            }
          >
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeCategory("Recordings")}>
          <Text
            style={
              selectedCategory === "Recordings"
                ? [styles.categoryText, styles.selectedCategory]
                : styles.categoryText
            }
          >
            Recordings
          </Text>
        </TouchableOpacity>
      </View>

      {selectedCategory === "Notes" && (
        <NoteList navigation={navigation} searchText={searchText} />
      )}

      {selectedCategory === "Recordings" && (
        <AudioList navigation={navigation} searchText={searchText} />
      )}

      <FloatingButton navigation={navigation} />
    </View>
  );
};

export default Home;