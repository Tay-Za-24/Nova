import { StyleSheet } from "react-native";
import { colors } from "../../util/color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
    letterSpacing: 1,
  },
  headerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c5e3f6"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.black,
    fontSize: 16,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginRight: 10,
  },
    selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    color: colors.accent
  },
  noteItem: {
    backgroundColor: colors.black,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});