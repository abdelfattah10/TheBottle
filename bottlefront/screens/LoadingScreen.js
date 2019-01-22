import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Loading } from '../src/components';


const LoadingScreen = (props)=>{
  return (
  <View style={styles.container}>
    <Loading {...props}/>
  </View>
  )
}

const styles = {
  container: {
    flex: 1
  }
};

export default LoadingScreen;
