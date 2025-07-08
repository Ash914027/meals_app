
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import Logout from './screens/Logout';
import Dishlist from './screens/Dishlist';
import RegisterScreen from './screens/RegisterScreen';
import { Ionicons } from '@expo/vector-icons';
import RecipeScreen from './screens/RecipeScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
  <NavigationContainer>
   <Stack.Navigator intialRouteName="Logout" >
    <Stack.Screen name="Register" component={RegisterScreen} options={
      { 
        headerShown: false,
        title: 'Restaurant App',
      }
    } />
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={({ navigation }) => ({
        title: 'Restaurant App',
        headerRight: () => (
          <>
          <Ionicons name="fast-food" size={28} color="#ff9800" style={{ marginRight: 10 }} />
            <Text style={
            { fontSize: 28,fontFamily:'Poppins-Bold', color: '#ff9800', marginRight: 500, fontWeight: 'bold' }
            }> Food Recipe App</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
            padding: 10,
            backgroundColor: '#ff9800',
            borderRadius: 5,
            marginRight: 10,
          }}>
            
            <Text style={{ backgroundColor: '#fffff', marginRight: 10 }}>Logout</Text>
          </TouchableOpacity>
          </>
        ),
      })}
    />
    <Stack.Screen name="Login" component={Logout} />
    <Stack.Screen name="Dishlist" component={Dishlist} options={{ title: 'Dish List' }} />
    <Stack.Screen name="RecipeScreen" component={RecipeScreen} options={{ title: 'Recipe' }} />
   </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
