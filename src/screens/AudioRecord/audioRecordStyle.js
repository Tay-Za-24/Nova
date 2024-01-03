import { StyleSheet } from 'react-native';
import { colors } from '../../util/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  headerTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: colors.black,
  },
  headerIcon: {
    marginRight: 10,
  },
  recordControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    marginTop: 30,
  },
  recordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    padding: 20,
    borderRadius: 50,
    elevation: 6,
  },
  recordButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c5e3f6",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    color: colors.black,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
    addBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  addBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    marginHorizontal: 20,
  },
  playButton: {
    fontSize: 16,
    color: colors.accent,
  },
  timerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.black,
  },
  audioPlay: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection : 'row',
    justifyContent : 'center'
  },
  durationText : {
    marginLeft : '5%',
    fontSize : 18,
    fontWeight : 'bold'
  }
});