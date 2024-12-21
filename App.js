import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Transfer from './pages/Transfer';
import TopUp from './pages/TopUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { UserProvider } from './context/UserContext';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <UserProvider>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'MyHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transfer') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (route.name === 'TopUp') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 50,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name="MyHome" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Transfer" component={Transfer} />
      <Tab.Screen name="TopUp" component={TopUp} />
    </Tab.Navigator>
  </UserProvider>
  );
}

const Stack = createNativeStackNavigator();

function Route() {
  const {user, getToken} = useAuth()
  useEffect(() => {getToken()}, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user? 'Home' : 'Login'}>
        {!user ? (
          <>
          <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
          />
          <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }} 
          />
          </>
        )
        :
        <Stack.Screen 
        name="Home" 
        component={MyTabs} 
        options={{ headerShown: false }} 
        />
        }
        {/* <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  )
}