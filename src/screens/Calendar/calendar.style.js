import { StyleSheet } from 'react-native';
import { ScreenHeight, ScreenWidth } from '../../util/helper';
import { colors } from '../../util/color';

const styles = StyleSheet.create({
    addTaskButton : {
        backgroundColor : colors.accent,
        width : 60,
        height : 60,
        borderRadius : 30,
        alignItems : 'center',
        justifyContent : 'center',
        position : 'absolute',
        right : ScreenWidth * 0.09,
        top : 475
    },
    taskContainer : {
        backgroundColor : colors.primary,
        padding : 20,
        position : 'relative',
        width : ScreenWidth,
        height : ScreenHeight * 0.63,
    },
    task : {
        backgroundColor : "#e1ecf7",
        padding : 20,
        borderRadius : 10,
        flexDirection : 'row',
        marginBottom : "5%",
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    addTaskContainer : {
        backgroundColor : 'white',
        padding : 20,
        borderRadius : 25
    },
    addTaskBox : {
        paddingTop : ScreenHeight * 0.03,
        paddingBottom : ScreenHeight * 0.03,
        paddingLeft : ScreenWidth * 0.05,
        borderRadius : 15,
        marginBottom : '2%',
        backgroundColor : "#e5e5e5"
    },
    addCategoryBtn : {
        padding : 10,
        backgroundColor : "grey",
        marginRight : 15,
        borderRadius : 10
    },
    deleteTaskBtn : {
        padding : 10,
        backgroundColor : colors.lightGray,
        marginRight : 20,
        borderRadius : 10,
        width : ScreenWidth * 0.16,
        backgroundColor : 'crimson'
    },
    addTaskModal : {
        justifyContent: 'flex-end', 
    },
    deleteAlert : {
        width : ScreenWidth * 0.8,
        backgroundColor : 'white',
        padding : 25,
        borderRadius : 20,
    },
    priorityPickerModal : {
        position : 'absolute',
        bottom : ScreenHeight * 0.022,
        left : ScreenWidth * 0.04
        },    
    priorityPicker : {
        backgroundColor : 'white',
        width : ScreenWidth * 0.3,
        paddingLeft : 10,
        paddingRight : 10,
        paddingTop: 15,
        paddingBottom:  15,
        borderRadius : 10
    },
    noTasksContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      noTasksText: {
        fontSize: 16,
        color: 'gray',
      },
      firstCircle : {
        width : ScreenWidth * 0.023,
        height : ScreenHeight * 0.01,
        backgroundColor : 'crimson',
        borderRadius : 5
      },
      secondaryCircle : {
        width : ScreenWidth * 0.023,
        height : ScreenHeight * 0.01,
        backgroundColor : 'orange',
        borderRadius : 5
      },
      normalCircle : {
        width : ScreenWidth * 0.023,
        height : ScreenHeight * 0.01,
        backgroundColor : 'lightblue',
        borderRadius : 5
      },
      reasonBox : {
        paddingTop : ScreenHeight * 0.01,
        paddingBottom : ScreenHeight * 0.01,
        paddingLeft : ScreenWidth * 0.03,
        borderRadius : 5,
        marginTop : "5%",
        marginBottom : '5%',
        backgroundColor : "#e5e5e5",
        width : ScreenWidth * 0.6
      },
      reasonModal : {
        backgroundColor : 'white',
        padding : 20,
        borderRadius : 25
      },
      addReasonBtn : {
        backgroundColor : 'grey',
        width : ScreenWidth * 0.19,
        height : ScreenHeight * 0.05,
        borderRadius : 20,
        justifyContent : 'center',
        marginLeft : '2%'
      }
});

export default styles

