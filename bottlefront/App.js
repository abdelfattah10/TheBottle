import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';

import store from './src/store';
import ProfileScreen from './screens/ProfileScreen';
import TransferScreen from './screens/TransferScreen';
import QrScreen from './screens/QrScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';


const AuthStack = createStackNavigator({
    Signup : { screen: SignupScreen, navigationOptions: { headerTitle: 'Sign Up'} },
    Login : { screen: LoginScreen, navigationOptions: { headerTitle: 'Log in'} },
  },
{
  initialRouteName: 'Login',
})

// const AppInterface = createBottomTabNavigator({
//     Profile: { screen: ProfileScreen },
//     Transfer: { screen: TransferScreen},
//     Scan: { screen: QrScreen}
//   },
// {
//   initialRouteName: 'Transfer',
// })
const AppInterface = createBottomTabNavigator({
    Profile: {
            screen:createStackNavigator({
              Profile: { screen: ProfileScreen,
                          navigationOptions: ({ navigation }) => ({
                                                    title: 'Profile',

                                                 }) },
                                        }),
                                      },
    Transfer: {
            screen:createStackNavigator({
              Transfer: { screen: TransferScreen,
                          navigationOptions: ({ navigation }) => ({
                                                    title: 'Transfer',
                                                 }) },
                                        }),
                                      },
    Scan: { screen: QrScreen}
  },
{
  initialRouteName: 'Profile',
})

const RootNavigator = createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: AuthStack,
    App : AppInterface
},
  {
    initialRouteName: 'Loading',
  })

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
//<Text>Open up App.js to start working on your app!</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
