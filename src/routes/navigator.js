import 'react-native-gesture-handler';
import React from 'react';
import Home from '../screens/Home';
import Details from '../screens/Details';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import About from '../screens/About';
import Tab from '../common/Tab';

const Stack = createStackNavigator();
const TabNav = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const AboutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="About">
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <TabNav.Navigator
        initialRouteName="Home"
        sceneContainerStyle={{paddingTop: 50, paddingBottom: 80}}
        tabBar={props => <Tab {...props} />}
        tabBarOptions={{
          activeBackgroundColor: '#000',
          inactiveBackgroundColor: '#000',
          tabStyle: {
            backgroundColor: '#000',
          },
          style: {
            height: -10,
            backgroundColor: '#000',
            display: 'none',
          },
        }}>
        <TabNav.Screen name="Profile" component={ProfileStack} />
        <TabNav.Screen name="Home" component={HomeStack} />
        <TabNav.Screen name="About" component={AboutStack} />
      </TabNav.Navigator>
    </NavigationContainer>
  );
};

export default App;
