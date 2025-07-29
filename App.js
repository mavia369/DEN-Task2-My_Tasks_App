import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskScreen from './src/screens/tasksScreen'
import EditTaskScreen from './src/screens/editTaskScreen';
import AddTaskScreen from './src/screens/addTaskScreen';
import * as colors from './src/utilities/colors'

const Stack = createNativeStackNavigator();

const App = () => {

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.buttonColor,
    },
    headerTintColor: colors.primaryLight,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name='Your Tasks' component={TaskScreen} />
          <Stack.Screen name='Edit Task' component={EditTaskScreen} />
          <Stack.Screen name='Add Task' component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;