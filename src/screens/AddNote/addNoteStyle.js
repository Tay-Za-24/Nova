import { StyleSheet } from "react-native";
import { colors } from "../../util/color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerIconLeft: {
    marginRight: 10,
  },
  headerIconRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 100,
  },
  horizontalLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#c5e3f6",
    marginBottom: 20,
    shadowColor: "#F1F1F7",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  toolbar: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dateTimeContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dateTimeText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: "bold",
  },
  inputTtl: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  inputNote: {
    minHeight: 200,
    maxHeight: 300,
    marginBottom: 20,
    fontSize: 17,
    backgroundColor: "colors.lightGray",
    borderRadius: 8,
    
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: -5,
    zIndex: 1,
  },
  inputImg: {
    width: "100%",
    height: 230,
    borderRadius: 8,
    marginTop: 20,
    resizeMode: "cover",
  },
  addBtnStyle: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
  },
  addBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});