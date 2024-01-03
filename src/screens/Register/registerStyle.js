import { StyleSheet } from "react-native";
import { colors } from '../../util/color';
import { ScreenHeight, ScreenWidth } from "../../util/helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    paddingBottom: 30,
    marginLeft : ScreenWidth * 0.05
  },
  headerTlt: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },
  inputGroup: {
    width: "90%",
    marginBottom: 20,
  },
  input: {
    // backgroundColor: colors.secondary,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth : 2,
  },
  errorsTxt: {
    fontSize: 10,
    color: colors.fail,
  },
  title: {
    color: colors.black,
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  showHideIcon: {
    position: "absolute",
    right: 10,
    top: 45,
  },
  inputGroupBtn: {
    width: "90%",
    marginTop: 30,
  },
  registerBtn: {
    backgroundColor: colors.accent,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
  },
  registerBtnTxt: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
    color : 'white'
  },
});
export { styles };