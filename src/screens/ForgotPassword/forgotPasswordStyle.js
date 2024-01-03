import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../util/color";

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  headerIcon: {
    alignSelf: "flex-start",
    position: "absolute",
    top: 30,
    left: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: colors.lightGray,
  },
  input: {
    borderWidth : 2,
    backgroundColor: 'transparent',
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    marginTop : '10%',
    backgroundColor: colors.tertiary,
    width: windowWidth - 40,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});