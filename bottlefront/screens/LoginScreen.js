import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Login } from '../src/components';


const LoginScreen = (props)=>{
  return (
  <View style={styles.container}>
    <Login {...props}/>
  </View>
  )
}

const styles = {
  container: {
    flex: 1
  }
};

export default LoginScreen;
