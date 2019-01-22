import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Signup } from '../src/components';


const SignupScreen = (props)=>{
  return (
  <View style={styles.container}>
    <Signup {...props}/>
  </View>
  )
}

const styles = {
  container: {
    flex: 1
  }
};

export default SignupScreen;
