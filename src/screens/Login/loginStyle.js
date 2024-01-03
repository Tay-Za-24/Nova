import { StyleSheet } from "react-native";
import { colors } from "../../util/color";

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
    flexDirection : "row",
    // alignItems: "center",
    padding: 10,
    paddingBottom: 50,
  },
  headerTlt: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  inputGroup: {
    width: "90%",
    marginBottom: 20,
  },
  input: {
    borderWidth : 2,
    backgroundColor: 'transparent',
    width: "100%",
    padding: 15,
    borderRadius: 10,
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
    top: 18,
  },
  inputGroupBtn: {
    width: "90%",
    marginTop: 30,
  },
  loginBtn: {
    backgroundColor: colors.accent,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
  },
  loginBtnTxt: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
    color : 'white'
  },

  registerBtn: {
    backgroundColor: colors.tertiary,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom : '5%',
    shadowColor: "#000",
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
    color : 'white',
  },
  guestBtn: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 30,
    textAlign: "center",
    color: colors.success,
    textDecorationLine: "underline",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    width: 80,
    marginTop: 25,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
    padding: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export { styles };
