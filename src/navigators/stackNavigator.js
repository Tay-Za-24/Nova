import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/Register/register"
import Login from "../screens/Login/login";
import ForgotPassword from "../screens/ForgotPassword/forgotPassword";
import Main from "../screens/Main/main";
import AudioRecord from "../screens/AudioRecord/audioRecord";
import AddNote from "../screens/AddNote/addNote";
import { Easing } from "react-native-reanimated"
import AudioPlayer from "../component/audioPlayer";

const Stack = createStackNavigator();

const config = {
  animation : 'spring',
  config : {
      stiffness : 800,
      damping : 500,
      mass : 3,
      overshootClamping : false,
      restDisplacementThreshold : 0.01,
      restSpeedThreshold : 0.01,
  }
}

const closeConfig = {
  animation : 'timing',
  config : {
      duration : 300,
      easing : Easing.linear
  }
}

export default function StackNavigator() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false, transitionSpec : { open : config, close : closeConfig},cardStyleInterpolator : CardStyleInterpolators.forVerticalIOS}}  initialRouteName= "Login">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="AudioRecord" component={AudioRecord} />
        <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
      <Stack.Screen name="AddNote" component={AddNote} />
    </Stack.Navigator>
  );
}