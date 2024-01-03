import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 5,
  },
  noteInfo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: "hidden",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  notePara: {
    paddingLeft: 12,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  noteImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noteReminderDate: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    position: 'absolute',
    bottom: 8,
    left: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: "#f7e8e8",
    borderRadius: 8,
    marginTop: 5,
    marginLeft: 5,
  },
  noteDate: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 12,
    color: 'gray',
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 20,
    padding: 5,
  },
  reminder : {
    marginTop : '75%', 
    marginLeft : 10, 
    borderColor : 'grey', 
    borderWidth : 1,
    width : '45%',
    alignItems :"center",
    borderRadius : 10,
    paddingTop : 5,
    paddingBottom : 5,
  }
});