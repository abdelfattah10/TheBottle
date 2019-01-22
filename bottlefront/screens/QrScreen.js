import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Qrscan } from '../src/components';


const QrScreen = (props)=>{
  return (
  <View style={styles.container}>
    <Qrscan {...props}/>
  </View>
  )
}

const styles = {
  container: {
    flex: 1
  }
};

export default QrScreen;
