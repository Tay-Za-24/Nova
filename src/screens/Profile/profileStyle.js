import { StyleSheet } from "react-native";
import { colors } from "../../util/color";
import { ScreenHeight, ScreenWidth } from "../../util/helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop : 20
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgProfile: {
    fontSize: 100,
    color: "#8f96a1",
  },
  headerUserTtl: {
    marginLeft: 20,
  },
  headerUserTtl01: {
    fontSize: 16,
    color: colors.lightGray,
    marginBottom: 8,
  },
  headerUserTtl02Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerUserTtl02: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    marginRight: 30,
  },
  rightArrow: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.black,
  },
  signOutButton: {
    backgroundColor: colors.fail,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  signOutButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  infoBox : {
    width : ScreenWidth * 0.43,
    height : ScreenHeight * 0.13,
    backgroundColor : '#bde0fe',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 15,
  },
  graphContainer : {
      width : ScreenWidth,
      marginTop : '5%', 
      marginLeft : '-6%',
      paddingLeft : ScreenWidth * 0.03,
      // marginRight : "-6%",
      backgroundColor : '#caf0f8',
      paddingTop : ScreenHeight * 0.02,
      paddingBottom : ScreenHeight * 0.03,
      alignContent : "center"
  },
  graphHeader : {
      fontSize : 16,
      fontWeight : 'bold',
      opacity : 0.6,
      marginLeft : '8%',
      marginBottom : '5%'
  },
  overdueTaskContainer : {
      marginTop : "5%"
  },
  reasonItem : {
    backgroundColor : '#bde0fe',
    marginTop : '2%',
    borderRadius : 10,
    justifyContent : 'center',
    padding : ScreenWidth * 0.04,
  },
  reason : {
    fontWeight : "bold",
    marginTop : '2%'
  }
});

export { styles };
